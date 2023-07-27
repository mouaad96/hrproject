import express from "express";
import {
  addBureau,
  deleteBureau,
  getBureau,
} from "../controllers/bureauController.js";

const router = express.Router();

router.post("/create", addBureau);
router.get("/list", getBureau);
router.delete("/delete/:id", deleteBureau);

export default router;
