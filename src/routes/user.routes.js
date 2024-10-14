import { Router } from 'express'
import { loginUser, logoutUser, registerUser, test, updateDuration, updatePasswordThroughOTP } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/test").get(test);

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/login").post(loginUser)
router.route("/resetOtpPassword").post(updatePasswordThroughOTP);
router.route("/updateDuration").post(verifyJWT, updateDuration);

export default router;