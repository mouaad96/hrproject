import express from "express";
import {
  addPresence,
  getPresence,
  getPresenceById,
  updatePresence,
} from "../controllers/presenceController.js";

const router = express.Router();

router.get("/list", getPresence);
router.get("/onePres/:id", getPresenceById);
router.post("/create", addPresence);
router.put("/update/:id", updatePresence);

export default router;
