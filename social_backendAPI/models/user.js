import mongoose from 'mongoose';
import uuidv1 from 'uuid/v1';
import crypto from 'crypto';

const {ObjectId} = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type:String,
        required:true
    },
    salt: String,
    created:{
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    following: [{type: ObjectId,ref: "User"}],
    followers: [{type: ObjectId,ref: "User"}]

})



//virtual field

userSchema.virtual('password')
.set(function(password){

    //create temporary variavle called password
    this._password = password

    // generare a timestamp
    this.salt =uuidv1()

    //encrypt password
   this.hashed_password=this.encryptPassword(password)
})
.get(function(){


    return this._password;
})





userSchema.methods ={

    authenticate: function (plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },

   encryptPassword: function(password){
       if(!password) return "";
       try{
           return  crypto.createHmac('sha256', this.salt)
           .update(password)
           .digest('hex');
       }catch(err){
           return ""
       }
   }
}




const User = mongoose.model("User", userSchema)

export default User
