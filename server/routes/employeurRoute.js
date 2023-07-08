import express from "express";
import { addEmp, getEmp } from "../controllers/employeurController.js";

const router = express.Router();

router.post("/create", addEmp);
router.get("/list", getEmp);

export default router;
