import express from 'express'
import {getPosts, createPost,postsByUser,postById,isPoster,deletePost,updatePost} from '../controllers/post'
import createPostValidator from '../validator'
import {requireSignin} from '../controllers/auth'
import {userById, deleteUser} from '../controllers/user'


const router = express.Router()
router.get('/posts',getPosts);
router.post('/post/new/:userId', requireSignin,createPost,createPostValidator);
router.get('/post/by/:userId',postsByUser);
router.delete('/post/:postId', requireSignin,  isPoster, deletePost)
router.put('/post/:postId', requireSignin, isPoster, updatePost)

router.param("userId", userById);
router.param("postId", postById)



export default router