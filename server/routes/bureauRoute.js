import express from "express";
import {
  addBureau,
  deleteBureau,
  getBureau,
  getBureauById,
  updateBureau,
} from "../controllers/bureauController.js";

const router = express.Router();

router.post("/create", addBureau);
router.get("/list", getBureau);
router.delete("/delete/:id", deleteBureau);
router.get("/bureau/:id", getBureauById);
router.put("/update/:id", updateBureau);

export default router;
