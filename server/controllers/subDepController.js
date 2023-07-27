import { db } from "../db/connect.js";

export const addSubDepartement = (req, res) => {
  //check if emp exists
  const q = "SELECT * FROM subdepartement WHERE idSd = ?";
  db.query(q, [req.body.idSd], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Subdepartement existe deja");
    const { idSd, nomSubDep, idDep } = req.body;
    const q = `INSERT INTO subdepartement(idSd,nomSubDep, idDep) VALUES(?,?,?)`;
    const values = [idSd, nomSubDep, idDep];
    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Sous Département Ajouter!");
      })
    );
  });
};

export const getSubDepartement = (req, res) => {
  const q = `SELECT s.idSd, s.nomSubDep, d.nomDep 
             FROM subdepartement s 
             JOIN departement d
             ON d.idDep = s.idDep`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteSubDepartement = (req, res) => {
  const idSd = req.params.id;
  const q = `
      DELETE FROM subdepartement
      WHERE idSd = ?
    `;
  db.query(q, idSd, (err, results) => {
    if (err) {
      res.status(500).send("Erreur suppression");
    } else {
      res.send("Sous Département Supprimer");
    }
  });
};

export const getSubDepById = (req, res) => {
  const idSd = req.params.id;
  const q = `SELECT * FROM subdepartement WHERE idSd = ?`;

  db.query(q, [idSd], (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection Sous Département");
    } else if (results.length === 0) {
      res.status(404).send("Sous Département n'exist pas");
    } else {
      res.send(results[0]);
    }
  });
};

export const updateSubDepartement = (req, res) => {
  const idSd = req.params.id;
  const { nomSubDep, idDep } = req.body;
  const q = `UPDATE subdepartement 
             SET nomSubDep = ?, idDep= ?   
             WHERE idSd = ?`;

  db.query(q, [nomSubDep, idDep, idSd], (err, resp) => {
    if (err) {
      res.status(500).json("erreur mise a jour Sous Département");
    } else {
      res.send("Sous Département a jour!");
    }
  });
};
