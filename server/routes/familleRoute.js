import express from "express";
import {
  addFamille,
  getFamille,
  deleteFamille,
  getFamilleById,
  updateFamille,
} from "../controllers/familleController.js";

const router = express.Router();

router.post("/create", addFamille);
router.get("/list", getFamille);
router.delete("/delete/:id", deleteFamille);
router.get("/famille/:id", getFamilleById);
router.put("/update/:id", updateFamille);

export default router;
