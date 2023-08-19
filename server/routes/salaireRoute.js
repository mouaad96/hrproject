import express from "express";

import {
  addSalaire,
  deleteSalaire,
  getEmployeurSalaire,
  getSalaire,
  getSalaireById,
  updateSalaire,
} from "../controllers/salaireController.js";

const router = express.Router();

router.post("/create", addSalaire);
router.get("/list", getSalaire);
router.delete("/delete/:id", deleteSalaire);
router.get("/salaire/:id", getSalaireById);
router.get("/empSal/:id", getEmployeurSalaire);
router.put("/update/:id", updateSalaire);

export default router;
