import express from "express";
import employeurRoute from "./routes/employeurRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifierConnexion } from "./middleware/authMiddleware.js";

const app = express();

//middleware

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
app.use("/api/emp", verifierConnexion, employeurRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("API working");
});
