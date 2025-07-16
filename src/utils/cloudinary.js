import { v2 as cloudinary } from 'cloudinary';

import fs from "fs"
import dotenv from "dotenv"


dotenv.config();
 //configure cloudinary 
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOnCloudinary = async (localFilePath) => {
        try{
           if(!localFilePath) return null
           const response =  await cloudinary.uploader.upload(
            localFilePath, {
                resource_type : "auto"
            }
           )
           console.log("File upload on cloudinary . File src" + response.url)
           //once the file is uploaded , we would like to delete it from our server 
           fs.unlinkSync(localFilePath)
           return response
        }catch(error){
            console.error("Cloudinary upload error:", error);

        // Cleanup local file if it exists
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
}

const deleteFromCloudinary = async (pulicId) => {
    try{
        const result = await cloudinary.uploader.destroy(publicId)
        console.log("Deleted fromcloudinary . public id" , publicId)
    }catch(error){
        console.log("Error deleting from the cloudinary" , error)
        return null
    }
}

export {uploadOnCloudinary, deleteFromCloudinary}