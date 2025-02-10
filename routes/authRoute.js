import express from "express";
import {
  registerController,
  loginController,
  setExpirationNotification
} from "../controllers/authController.js";



//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.post("/set-expiration", setExpirationNotification);

export default router;