import { db } from "../db/connect.js";

export const addBureau = (req, res) => {
  //check if emp exists
  const q = "SELECT * FROM bureau WHERE intitule = ?";
  db.query(q, [req.body.intitule], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Bureau existe deja");
    const { idBureau, intitule, etagere, idSd } = req.body;
    const q = `INSERT INTO bureau(idBureau,intitule,etagere,idSd) VALUES(?,?,?,?)`;
    const values = [idBureau, intitule, etagere, idSd];
    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Bureau ajouter");
      })
    );
  });
};

export const getBureau = (req, res) => {
  const q = "SELECT * FROM Bureau ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
