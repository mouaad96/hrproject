import { db } from "../db/connect.js";

export const addDepartement = (req, res) => {
  //check if emp exists
  const q = "SELECT * FROM departement WHERE idDep = ?";
  db.query(q, [req.body.nomDes], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("departement existe deja");
    const { idDep, nomDep } = req.body;
    const q = `INSERT INTO departement(idDep,nomDep) VALUES(?,?)`;
    const values = [idDep, nomDep];
    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Département Ajouter!");
      })
    );
  });
};

export const getDepartement = (req, res) => {
  const q = "SELECT * FROM departement ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteDepartement = (req, res) => {
  const idDep = req.params.id;
  const q = `
      DELETE FROM departement
      WHERE idDep = ?
    `;
  db.query(q, idDep, (err, results) => {
    if (err) {
      res.status(500).send("Erreur suppression");
    } else {
      res.send("Département Supprimer");
    }
  });
};

export const getDepById = (req, res) => {
  const idDep = req.params.id;
  const q = `SELECT * FROM departement WHERE idDep = ?`;

  db.query(q, [idDep], (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection Departement");
    } else if (results.length === 0) {
      res.status(404).send("Departement n'exist pas");
    } else {
      res.send(results[0]);
    }
  });
};

export const updateDepartement = (req, res) => {
  const idDep = req.params.id;
  const { nomDep } = req.body;
  const q = `UPDATE departement 
             SET nomDep = ? 
             WHERE idDep = ?`;

  db.query(q, [nomDep, idDep], (err, resp) => {
    if (err) {
      res.status(500).json("erreur mise a jour Departement");
    } else {
      res.send("Département a jour!");
    }
  });
};
