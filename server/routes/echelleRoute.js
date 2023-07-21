import express from "express";
import { getEchelle } from "../controllers/echelleController.js";

const router = express.Router();

router.get("/list", getEchelle);

export default router;
