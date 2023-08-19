import express from "express";
import {
  addPresence,
  deletePresence,
  getPresence,
  getPresenceById,
} from "../controllers/presenceController.js";

const router = express.Router();

router.get("/list", getPresence);
router.get("/onePres/:id", getPresenceById);
router.post("/create", addPresence);
router.delete("/delete/:id", deletePresence);

export default router;
