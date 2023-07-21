import express from "express";

import {
  addDesignation,
  getDesgination,
} from "../controllers/desController.js";

const router = express.Router();

router.post("/create", addDesignation);
router.get("/list", getDesgination);

export default router;
