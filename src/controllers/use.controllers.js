import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
   //get user detail from frontend
   //validation-not empty
   //check user already registered with same username and email
   //check for image and check for avator
   //upload image to cloudinary,avator
   //create user object- create entry in db
   //remove password and refresh token feild from response
   //check for user creation 
   // return response

   const {fullname, email,username,password}=req.body
   console.log("email: ",email);
   
   if(
    [fullname,email,username,password].some((field)=>field?.trim()==="")
){
    throw new ApiError(400,"All fields is required");

   }

   const existedUser=User.findOne({
    $or:[{username},{email}]
   })
   
   if(existedUser){
    throw new ApiError(409,"User already exist with same username or email");
   }

   const avatarLocalPath=req.files?avator[0]?.path:null;
   const coverImageLocalPath=req.files?coverImage[0]?.path:null;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avator is required");
   }

   const avator =await uploadOnCloudinary(avatarLocalPath)
   const coverImage =await uploadOnCloudinary(coverImageLocalPath)

   if(!avator){
    throw new ApiError(400,"Avator file is required");
   }

   const user=await User.create({
    fullname,
    avator:avator.url,
    coverImage:coverImage?.url||"",
    email,
    username:username.toLowerCase(),
    password
   })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )

    if(!createdUser){
        throw new ApiError(500,"User registration failed");
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully") 
    )
})

export { registerUser };
