import express from "express";
import { requireSignin } from "../middlewares";

const router = express.Router();

import { register, login, logout, currentUser } from "../controllers/auth";
import { predictImage } from "../controllers/predict";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/predict", predictImage);

module.exports = router;
