import express from "express";
import {
  addEmp,
  deleteEmp,
  getEmp,
  getEmpBureau,
  getEmpById,
  getEmpDesignation,
  updateEmp,
} from "../controllers/employeurController.js";

const router = express.Router();

router.post("/create", addEmp);
router.get("/list", getEmp);
router.get("/employeur/:id", getEmpById);
router.get("/empDes", getEmpDesignation);
router.get("/empBur", getEmpBureau);
router.put("/update/:id", updateEmp);
router.delete("/delete/:id", deleteEmp);

export default router;
