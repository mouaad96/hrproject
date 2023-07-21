import { db } from "../db/connect.js";

export const addDesignation = (req, res) => {
  //check if emp exists
  const q = "SELECT * FROM designation WHERE nomDes = ?";
  db.query(q, [req.body.nomDes], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Designation existe deja");
    const { idDes, nomDes } = req.body;
    const q = `INSERT INTO designation(idDes,nomDes) VALUES(?,?)`;
    const values = [idDes, nomDes];
    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Designation ajouter");
      })
    );
  });
};

export const getDesgination = (req, res) => {
  const q = "SELECT * FROM designation ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
