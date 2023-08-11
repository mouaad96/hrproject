import express from "express";
import {
  addDemande,
  deleteDemande,
  getDemandeById,
  getDemandes,
  getEmployeurDemandes,
} from "../controllers/demandeController.js";

const router = express.Router();

router.get("/list", getDemandes);
router.get("/demande/:id", getDemandeById);
router.get("/empDem/:id", getEmployeurDemandes);
router.post("/create", addDemande);
router.delete("/delete/:id", deleteDemande);

export default router;
