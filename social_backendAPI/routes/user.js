import express from 'express'
import {userById,allUsers,getUser,updateUser,deleteUser,userPhoto,addFollowing,addFollower,removeFollowing,removeFollower,findPeople} from '../controllers/user'
import {requireSignin} from '../controllers/auth'

const router = express.Router()

router.put('/user/follow', requireSignin,addFollowing,addFollower)
router.put('/user/unfollow', requireSignin,removeFollowing,removeFollower)
router.get('/users',allUsers)
router.get('/user/:userId',requireSignin,getUser)
router.put('/user/:userId',requireSignin,updateUser)
router.delete('/user/:userId',requireSignin,deleteUser)
router.get('/user/photo/:userId',userPhoto)
router.get('/user/findpeople/:userId', requireSignin,findPeople);

router.param("userId", userById)


export default router