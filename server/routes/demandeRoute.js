import express from "express";
import {
  addDemande,
  deleteDemande,
  getDemandeById,
  getDemandes,
  getEmployeurDemandes,
  updateDemande,
} from "../controllers/demandeController.js";

const router = express.Router();

router.get("/list", getDemandes);
router.get("/demande/:id", getDemandeById);
router.get("/empDem/:id", getEmployeurDemandes);
router.put("/update/:id", updateDemande);
router.post("/create", addDemande);
router.delete("/delete/:id", deleteDemande);

export default router;
