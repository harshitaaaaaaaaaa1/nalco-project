import { Router } from 'express'
import { sendOTP, verifyOTP } from '../controllers/otp.controller.js';

const router = Router();

router.route("/").post(sendOTP);
router.route("/verify").post(verifyOTP)

export default router