import express from "express";
import {
  addConge,
  deleteConge,
  getConge,
  getCongeById,
} from "../controllers/congeController.js";

const router = express.Router();

router.post("/create", addConge);
router.get("/list", getConge);
router.get("/conge/:id", getCongeById);
router.delete("/delete/:id", deleteConge);

export default router;
