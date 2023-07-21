import express from "express";
import { getEchelant } from "../controllers/echelantController.js";

const router = express.Router();

router.get("/list", getEchelant);

export default router;
