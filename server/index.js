import express from "express";
import employeurRoute from "./routes/employeurRoute.js";
import authRoute from "./routes/authRoute.js";
import bureauRoute from "./routes/bureauRoute.js";
import desRoute from "./routes/desRoute.js";
import echelleRoute from "./routes/echelleRoute.js";
import echelantRoute from "./routes/echelantRoute.js";
import departementRoute from "./routes/departementRoute.js";
import sousDepRouter from "./routes/sousDepRouter.js";
import presenceRoute from "./routes/presenceRoute.js";
import congeRoute from "./routes/congeRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { verifierConnexion } from "./middleware/authMiddleware.js";

const app = express();

//middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

//route
app.use("/api/emp", verifierConnexion, employeurRoute);
app.use("/api/bur", bureauRoute);
app.use("/api/auth", authRoute);
app.use("/api/des", desRoute);
app.use("/api/echelle", echelleRoute);
app.use("/api/echelant", echelantRoute);
app.use("/api/dep", departementRoute);
app.use("/api/subDep", sousDepRouter);
app.use("/api/presence", presenceRoute);
app.use("/api/conge", congeRoute);

app.listen(5000, () => {
  console.log("API working");
});
