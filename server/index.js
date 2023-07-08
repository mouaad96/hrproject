import Express from "express";
import employeurRoute from "./routes/employeurRoute.js";

const app = Express();

//middleware

app.use(Express.json());

//route
app.use("/api/emp", employeurRoute);

app.listen(5000, () => {
  console.log("API working");
});
