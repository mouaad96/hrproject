import express from "express";
import {
  addPresence,
  updatePresence,
} from "../controllers/presenceController.js";

const router = express.Router();

router.post("/create", addPresence);
router.put("/update/:id", updatePresence);

export default router;
