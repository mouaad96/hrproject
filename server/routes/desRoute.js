import express from "express";

import {
  addDesignation,
  deleteDesignation,
  getDesgination,
  getDesignationById,
  updateDesignation,
} from "../controllers/desController.js";

const router = express.Router();

router.post("/create", addDesignation);
router.get("/list", getDesgination);
router.delete("/delete/:id", deleteDesignation);
router.get("/designation/:id", getDesignationById);
router.put("/update/:id", updateDesignation);

export default router;
