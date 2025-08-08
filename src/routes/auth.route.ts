import AuthHandler from "@handlers/auth.handler";
import express from "express";
const router = express.Router();
const authHandler = new AuthHandler();


// Bind methods properly to maintain 'this' context
router.route("/login").post(authHandler.login.bind(authHandler));
router.route("/register").post(authHandler.registerUser.bind(authHandler));

export default router;

