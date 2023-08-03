import express from "express";
import {
  addConge,
  deleteConge,
  getConge,
} from "../controllers/congeController.js";

const router = express.Router();

router.post("/create", addConge);
router.get("/list", getConge);
router.delete("/delete/:id", deleteConge);

export default router;
