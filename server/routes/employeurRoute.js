import express from "express";
import {
  addEmp,
  deleteEmp,
  getEmp,
  getEmpBureau,
  getEmpById,
  getEmpDesignation,
  updateEmp,
  getEmpGrade,
  updateEmpGrade,
  updateEmpDesignation,
  updateEmpBureau,
  updatePass,
  getAllEmployeeInfos,
} from "../controllers/employeurController.js";

const router = express.Router();

router.post("/create", addEmp);
router.get("/list", getEmp);
router.get("/employeur/:id", getEmpById);
router.get("/empDes", getEmpDesignation);
router.get("/empBur", getEmpBureau);
router.get("/empGrade", getEmpGrade);
router.put("/update/:id", updateEmp);
router.put("/updateGrade/:id", updateEmpGrade);
router.put("/updateDes/:id", updateEmpDesignation);
router.put("/updateBur/:id", updateEmpBureau);
router.delete("/delete/:id", deleteEmp);
router.put("/updateMdp", updatePass);
router.get("/empInfos/:id", getAllEmployeeInfos);

export default router;
