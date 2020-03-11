import User from '../models/user'
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt'

require('dotenv').config()



//SIGNUP

const signup = async (req,res) => {
    const userExists = await User.findOne(
        {
            email: req.body.email
        }
    )
    if(userExists) 
    
    return res.status(403).json({
        error: 'Email is taken'
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({ message: "Signup success! please login"})
}

//SIGNIN


const signin =(req,res)=> {

    const {email,password} = req.body;
    
    User.findOne({email} ,(err, user) =>{
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email does not exits. Please Signup"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }


        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie("t", token,{expire: new Date()+ 9999});

        const {_id, name,email} = user;

        return res.json({token, user: {_id, email,name}});

    } );

};



//SIGNOUT
const signout = (req,res) => {
    res.clearCookie("t")
    return res.json({message: "signout success!"})
}


//express-jwt

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})





export {signup,signin,signout,requireSignin}