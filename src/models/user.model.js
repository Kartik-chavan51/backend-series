import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
const userSchema =new Schema(
    {
        username:{
            type :String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true //to make search faster
        },
        email:{
            type :String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type :String,
            required:true,
            trim:true,
            index:true //to make search faster
        },
        avatar:{
            type :String,//cloudnary url
            required:true,
        },
        coverImage:{
            type :String,

        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,
            required:[true,"Password is required"]
        },
        refreshToken:{
            type:String,
        }
    
    },
    {timestamps:true} //createdAt, updatedAt
)

userSchema.pre("save",  async function(next){
    if(!this.isModified("password")) 
        return next();

    this.password=await bcrypt.hash(this.password,10); 
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);

}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRES
    })
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRES
    })
}


export const User =mongoose.model("User",userSchema);