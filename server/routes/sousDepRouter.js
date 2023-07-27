import express from "express";
import {
  addSubDepartement,
  deleteSubDepartement,
  getSubDepById,
  getSubDepartement,
  updateSubDepartement,
} from "../controllers/subDepController.js";

const router = express.Router();

router.post("/create", addSubDepartement);
router.get("/list", getSubDepartement);
router.delete("/delete/:id", deleteSubDepartement);
router.get("/sousDep/:id", getSubDepById);
router.put("/update/:id", updateSubDepartement);

export default router;
