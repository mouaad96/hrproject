import { db } from "../db/connect.js";
import bcryptjs from "bcryptjs";

export const addEmp = (req, res) => {
  // check if logged in
  const token = req.cookies.accessToken;
  console.log(token);
  //check if emp exists
  const q = "SELECT * FROM employeur WHERE nomCpt = ?";
  db.query(q, [req.body.nomCpt], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("employeur existe deja");
    //create new emp
    // hash password

    const salt = bcryptjs.genSaltSync(10);
    const hashedPass = bcryptjs.hashSync(req.body.mdp, salt);

    const q =
      "INSERT INTO employeur (`immatricule`,`nomCpt`, `mdp`, `prenom`, `nom`, `dateN`, `sexe`, `adresse`, `tel`, `email`,`isAdmin`, `idBureau`,`idDes`, `idGrade`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      req.body.immatricule,
      req.body.nomCpt,
      hashedPass, // hashed pass
      req.body.prenom,
      req.body.nom,
      req.body.dateN,
      req.body.sexe,
      req.body.adresse,
      req.body.tel,
      req.body.email,
      req.body.isAdmin,
      req.body.idBureau,
      req.body.idDes,
      req.body.idGrade,
    ];

    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      })
    );
  });
};

export const getEmp = (req, res) => {
  const q = "SELECT * FROM employeur";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
