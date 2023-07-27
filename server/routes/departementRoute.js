import express from "express";
import {
  addDepartement,
  deleteDepartement,
  getDepById,
  getDepartement,
  updateDepartement,
} from "../controllers/departementController.js";

const router = express.Router();

router.post("/create", addDepartement);
router.get("/list", getDepartement);
router.delete("/delete/:id", deleteDepartement);
router.get("/departement/:id", getDepById);
router.put("/update/:id", updateDepartement);

export default router;
