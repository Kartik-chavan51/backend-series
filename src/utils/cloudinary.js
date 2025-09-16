import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null;

        //upload to cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,
            {
                resource_type:"auto",//image,video,raw
            }
         )
         //file has been uploaded successfully
         console.log("file uploaded on cloudinary ",response.url);
         fs.unlinkSync(localFilePath); //deleting the file from local storage
         return response;
    }
    catch(err){
        fs.unlinkSync(localFilePath); //deleting the file from local storage
        return null;
    }
}

export { uploadOnCloudinary };
