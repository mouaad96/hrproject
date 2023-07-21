import express from "express";
import employeurRoute from "./routes/employeurRoute.js";
import authRoute from "./routes/authRoute.js";
import bureauRoute from "./routes/bureauRoute.js";
import desRoute from "./routes/desRoute.js";
import echelleRoute from "./routes/echelleRoute.js";
import echelantRoute from "./routes/echelantRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verifierConnexion } from "./middleware/authMiddleware.js";

const app = express();

//middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

//route
app.use("/api/emp", verifierConnexion, employeurRoute);
app.use("/api/bur", bureauRoute);
app.use("/api/auth", authRoute);
app.use("/api/des", desRoute);
app.use("/api/echelle", echelleRoute);
app.use("/api/echelant", echelantRoute);

app.listen(5000, () => {
  console.log("API working");
});
