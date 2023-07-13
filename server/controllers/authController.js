import { db } from "../db/connect.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const q = "SELECT * FROM employeur WHERE nomCpt =?";

  db.query(q, [req.body.nomCpt], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("compte non existant");

    const checkMdp = bcryptjs.compareSync(req.body.mdp, data[0].mdp);
    if (!checkMdp)
      return res.status(400).json("nom de compte ou mot de passe inccorect");
    const token = jwt.sign({ id: data[0].immatricule }, "tokenSecretKey");
    const { mdp, ...others } = data[0];
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none", // we will be able to clear the cookie even if its not the same site
    })
    .status(200)
    .json("deconnexion!");
};
