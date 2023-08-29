import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

export const getSalaire = (req, res) => {
  const q = "SELECT * FROM paiment ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getSalaireById = (req, res) => {
  const idSal = req.params.id;
  const selectQuery = `
        SELECT *
        FROM paiment
        WHERE idPaiment = ?
      `;
  db.query(selectQuery, [idSal], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("Salaire introuvable");
    }
    const demande = data[0];
    return res.status(200).json(demande);
  });
};

export const getEmployeurSalaire = (req, res) => {
  const immatricule = req.params.id;
  const selectQuery = `
        SELECT *
        FROM paiment p
        JOIN employeur emp
        ON p.immatricule = emp.immatricule
        WHERE p.immatricule = ?
      `;
  db.query(selectQuery, immatricule, (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection salaire");
    } else if (results.length === 0) {
      res.status(404).send("salaire n'exist pas");
    } else {
      res.send(results);
    }
  });
};

export const addSalaire = (req, res) => {
  const { NumCompte, rappelNet, netMensuel, dateP, immatricule } = req.body;

  // Check if a record already exists for the current employee and month
  const checkQuery = `SELECT COUNT(*) AS count FROM paiment WHERE immatricule = ? AND MONTH(dateP) = ? AND YEAR(dateP) = ?`;
  const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed in JavaScript
  const currentYear = new Date().getFullYear();

  db.query(
    checkQuery,
    [immatricule, currentMonth, currentYear],
    (checkErr, checkResult) => {
      if (checkErr) {
        return res.status(500).json(checkErr);
      }

      const recordCount = checkResult[0].count;

      if (recordCount > 0) {
        return res
          .status(400)
          .json(
            "Un enregistrement de salaire existe déjà pour cet employé ce mois-ci."
          );
      }

      const idPaim = uuidv4();
      const insertQuery = `INSERT INTO paiment (idPaiment, NumCompte, rappelNet, netMensuel, dateP, immatricule) 
                          VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [
        idPaim,
        NumCompte,
        rappelNet,
        netMensuel,
        dateP,
        immatricule,
      ];

      db.query(insertQuery, values, (insertErr, result) => {
        if (insertErr) {
          return res.status(500).json(insertErr);
        }
        return res.status(200).json("Salaire Ajouté");
      });
    }
  );
};

export const updateSalaire = (req, res) => {
  const idPaiment = req.params.id;
  const { NumCompte, rappelNet, netMensuel, dateP, immatricule } = req.body;

  // Check if a record exists for the specified idPaiment
  const checkQuery = `SELECT COUNT(*) AS count FROM paiment WHERE idPaiment = ?`;

  db.query(checkQuery, [idPaiment], (checkErr, checkResult) => {
    if (checkErr) {
      return res.status(500).json(checkErr);
    }

    const recordCount = checkResult[0].count;

    if (recordCount === 0) {
      return res
        .status(400)
        .json("No salary record exists with the specified idPaiment.");
    }

    // Check if an existing record with the same month and employee exists
    const currentMonth = new Date(dateP).getMonth() + 1; // Month is 0-indexed in JavaScript
    const currentYear = new Date(dateP).getFullYear();
    const monthCheckQuery = `SELECT COUNT(*) AS count FROM paiment WHERE immatricule = ? AND MONTH(dateP) = ? AND YEAR(dateP) = ? AND idPaiment != ?`;

    db.query(
      monthCheckQuery,
      [immatricule, currentMonth, currentYear, idPaiment],
      (monthCheckErr, monthCheckResult) => {
        if (monthCheckErr) {
          return res.status(500).json(monthCheckErr);
        }

        const monthRecordCount = monthCheckResult[0].count;

        if (monthRecordCount > 0) {
          return res
            .status(400)
            .json(
              "Another salary record exists for this employee in the specified month."
            );
        }

        // Proceed with updating the record
        const updateQuery = `UPDATE paiment 
                           SET NumCompte = ?, rappelNet = ?, netMensuel = ?, dateP = ?, immatricule = ?
                           WHERE idPaiment = ?`;
        const updateValues = [
          NumCompte,
          rappelNet,
          netMensuel,
          dateP,
          immatricule,
          idPaiment,
        ];

        db.query(updateQuery, updateValues, (updateErr, updateResult) => {
          if (updateErr) {
            return res.status(500).json(updateErr);
          }
          return res.status(200).json("Salaire mis à jour");
        });
      }
    );
  });
};

export const deleteSalaire = (req, res) => {
  const idPaiment = req.params.id;
  const deleteQuery = `DELETE FROM paiment WHERE idPaiment = ?`;

  db.query(deleteQuery, [idPaiment], (deleteErr, deleteResult) => {
    if (deleteErr) {
      return res.status(500).json(deleteErr);
    }
    return res.status(200).json("Paiement Supprimé");
  });
};
