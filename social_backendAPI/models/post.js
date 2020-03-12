import mongoose from 'mongoose';


const  {ObjectId} = mongoose.Schema

const postSchema = new mongoose.Schema ({
    title:{
        type: String,
        required: true,
        
    },
    body: {
        type: String,
        required: true,
      
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    updated: Date,
    postedBy:{
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [
        {type: ObjectId, ref: "User"}
    ]
});


const Post = mongoose.model("Post",postSchema)

export default Post;