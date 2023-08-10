import express from "express";
import {
  addFerie,
  deleteFerie,
  getFerie,
  getFerieById,
  updateFerie,
} from "../controllers/ferieController.js";

const router = express.Router();

router.get("/list", getFerie);
router.get("/ferie/:id", getFerieById);
router.post("/create", addFerie);
router.put("/update/:id", updateFerie);
router.delete("/delete/:id", deleteFerie);

export default router;
