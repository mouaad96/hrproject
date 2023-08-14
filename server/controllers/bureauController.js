import { db } from "../db/connect.js";

export const addBureau = (req, res) => {
  //check if bureau exists
  const q = `SELECT * FROM bureau WHERE intitule = ?`;
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
  const q = `SELECT b.idBureau, b.intitule, b.etagere, s.nomSubDep FROM bureau b 
            JOIN subdepartement s
            ON b.idSd = s.idSd`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteBureau = (req, res) => {
  const idB = req.params.id;

  // Check if there are employees associated with the bureau before deleting it.
  const checkEmployeesQuery = `SELECT COUNT(*) AS employeeCount FROM employeur WHERE idBureau = ?`;
  db.query(checkEmployeesQuery, idB, (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la vérification des employés.");
    } else {
      const employeeCount = result[0].employeeCount;
      if (employeeCount > 0) {
        res
          .status(409)
          .send("Impossible de supprimer le bureau car un employé l'occupe.");
      } else {
        const deleteQuery = `DELETE FROM bureau WHERE idBureau = ?`;
        db.query(deleteQuery, idB, (err, result) => {
          if (err) {
            res.status(500).send("Erreur lors de la suppression du bureau.");
          } else {
            res.send("Bureau supprimé.");
          }
        });
      }
    }
  });
};

export const getBureauById = (req, res) => {
  const idbur = req.params.id;
  const q = `SELECT * FROM bureau WHERE idBureau = ?`;

  db.query(q, [idbur], (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection bureau");
    } else if (results.length === 0) {
      res.status(404).send("Bureau n'exist pas");
    } else {
      res.send(results[0]);
    }
  });
};

export const updateBureau = (req, res) => {
  const idbur = req.params.id;
  const { intitule, etagere, idSd } = req.body;
  const q = `UPDATE bureau 
             SET intitule = ?, etagere= ?, idSd=?
             WHERE idBureau = ?`;

  db.query(q, [intitule, etagere, idSd, idbur], (err, resp) => {
    if (err) {
      res.status(500).json("erreur mise a jour Bureau");
    } else {
      res.send("Bureau a jour!");
    }
  });
};
