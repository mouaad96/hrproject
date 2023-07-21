import express from "express";
import { addBureau, getBureau } from "../controllers/bureauController.js";

const router = express.Router();

router.post("/create", addBureau);
router.get("/list", getBureau);

export default router;
