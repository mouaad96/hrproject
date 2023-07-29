import { db } from "../db/connect.js";

export const addDesignation = (req, res) => {
  // check if emp exists
  const checkQuery = "SELECT * FROM designation WHERE nomDes = ?";
  db.query(checkQuery, [req.body.nomDes], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Designation existe deja");

    const { idDes, nomDes } = req.body;
    const insertQuery = `INSERT INTO designation (idDes, nomDes) VALUES (?, ?)`;
    const values = [idDes, nomDes];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Handle duplicate primary key error
          return res.status(409).json("Numéro De Désignation existe deja");
        } else {
          return res.status(500).json(err);
        }
      }

      return res.status(200).json("Designation ajoutee");
    });
  });
};

export const getDesgination = (req, res) => {
  const q = "SELECT * FROM designation ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const deleteDesignation = (req, res) => {
  const idD = req.params.id;
  const checkDesignationQuery = `SELECT COUNT(*) AS designationCount FROM employeur WHERE idDes = ?`;
  db.query(checkDesignationQuery, idD, (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la vérification des designations.");
    } else {
      const designationCount = result[0].designationCount;
      if (designationCount > 0) {
        console.log(designationCount);
        res
          .status(409)
          .send(
            "Impossible de supprimer la Désignation car un employé l'occupe."
          );
      } else {
        const deleteQuery = `DELETE FROM designation WHERE idDes = ?`;
        db.query(deleteQuery, idD, (err, result) => {
          if (err) {
            res
              .status(500)
              .send("Erreur lors de la suppression du désignation.");
          } else {
            res.send("Bureau supprimé.");
          }
        });
      }
    }
  });
};

export const getDesignationById = (req, res) => {
  const idD = req.params.id;
  const q = `SELECT * FROM designation WHERE idDes = ?`;

  db.query(q, [idD], (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection designation");
    } else if (results.length === 0) {
      res.status(404).send("designation n'exist pas");
    } else {
      res.send(results[0]);
    }
  });
};

export const updateDesignation = (req, res) => {
  const idD = req.params.id;
  const { nomDes } = req.body;
  const q = `UPDATE designation 
             SET nomDes = ?
             WHERE idDes = ?`;

  db.query(q, [nomDes, idD], (err, resp) => {
    if (err) {
      res.status(500).json("erreur mise a jour designation");
    } else {
      res.send("designation a jour!");
    }
  });
};
