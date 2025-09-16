import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js"; // ✅ matches file name

export const  verifyJWT=async(req,_,next)=>{
    try{
        const token=req.cookies?.accessToken|| req.header("Authorization")?replace("Bearer ",""):null;

    if(!token){
        throw new ApiError(401).json({message:"Unauthorized"});
    }

    const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user=await User.findById(decodeToken?._id).select("-password -refreshToken");
    if(!user){
        throw new ApiError(401,"Invalid Access token");
    }

    req.user=user;
    next();
    }
    catch(error){
        throw new ApiError(401,error?.message || "Unauthorized");
    }
}
