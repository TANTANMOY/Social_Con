import Post from '../models/post'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

const postById = (req,res,next,id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments","text created")
    .populate("comments.postedBy","_id name")
    .exec((err,post) => {
        if(err || !post) {
            return res.status(400).json({
                error: err
            })
        }
        req.post =post
        next()

    })
}




const getPosts= (req,res) => {
   
  Post.find()
  .populate("postedBy","_id name")
  .populate("comments","text created")
  .populate("comments.postedBy","_id name")
  .select("_id title body created likes")
  .sort({created: -1})
  .then(posts=> {
      res.json(posts)
  })
.catch(err=> console.log(err))
}


const createPost = (req,res)=> {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {

        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        req.profile.hashed_password = undefined
        req.profile.salt = undefined

        post.postedBy= req.profile
        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType= files.photo.type
        }
        post.save((err,result) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })

    })
  
}

const postsByUser = (req,res) => {
    Post.find({postedBy: req.profile._id})
    .populate("postedBy", "_id name")
    .select("_id title body created likes")
    .sort("_created")
    .exec((err,posts) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json(posts)
    })

}



const isPoster = (req,res,next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if(!isPoster) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next();
}

const deletePost = (req,res) => {
    let post = req.post
    post.remove((err, post) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfully"
        })
    })
}


// const updatePost = (req,res,next) => {
//     let post = req.post
//     post = _.extend(post, req.body)
//     post.updated = Date.now()
//     post.save(err => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(post)
//     })
// }




const updatePost = (req,res,next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions= true
    form.parse(req, (err,fields,files) => {
        if(err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        //save user
        let post = req.post
        post = _.extend(post,fields)
        post.updated = Date.now()

        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
           
            res.json(post)
        }) 
    })
};


const photo =(req,res,next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

const singlePost =(req,res) => {
    return res.json(req.post)
}

const like = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}},
        {new: true} 
        ).exec((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }else {
                res.json(result)
            }
        })
}

const unlike = (req,res) => {
    Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}},
        {new: true} 
        ).exec((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }else {
                res.json(result)
            }
        })
}
const comment = (req,res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId

    Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}},
        {new: true} 
        )
        .populate('commets.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }else {
                res.json(result)
            }
        })
}

const uncomment = (req,res) => {
    let comment = req.body.comment
  

    Post.findByIdAndUpdate(req.body.postId, {$pull: {comments: {_id: comment._id}}},
        {new: true} 
        ).exec((err,result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }else {
                res.json(result)
            }
        })
}



export {getPosts,createPost,postsByUser,postById,isPoster,deletePost,updatePost,photo,singlePost,like,unlike,comment,uncomment}