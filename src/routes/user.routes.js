import { Router } from "express";
import { changeCurrentPassword, getCurrentUserDetails, getUserChannelprofile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateaccountdetails, updateUserAvatar, updateUserCoverImage } from "../controllers/use.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router= Router();

router.route('/register').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)
//router.route('/login').post(login)

router.route('/login').post(loginUser)

//secured route
router.route('/logout').post(verifyJWT,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/changePassword").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUserDetails)

router.route("/update-account").patch(verifyJWT,updateaccountdetails)

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelprofile)

router.route("/history").get(verifyJWT,getWatchHistory)



export default router; 