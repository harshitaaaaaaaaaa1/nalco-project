import { Router } from 'express'
import { addVisit, getAnalytics, toggleBounce } from '../controllers/analytics.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/getData").get(verifyJWT, getAnalytics);
router.route("/addVisit").post(verifyJWT, addVisit)
router.route("/toggleBounce").post(verifyJWT, toggleBounce);

export default router;