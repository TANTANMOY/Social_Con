import express from 'express'
import {signup,signin,signout} from '../controllers/auth'
import {userById} from '../controllers/user'
import {userSignupValidator} from '../validator/index'
// import createPostValidator from '../validator'


const router = express.Router()

router.post('/signup',userSignupValidator,signup)
router.post('/signin',signin)

//signout
router.get('/signout',signout)
router.param("userId", userById)


export default router