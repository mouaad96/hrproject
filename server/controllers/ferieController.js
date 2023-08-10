import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

export const getFerie = (req, res) => {
  const q = "SELECT * FROM ferie ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFerieById = (req, res) => {
  const idfer = req.params.id;

  const selectQuery = `
      SELECT *
      FROM ferie
      WHERE idfer = ?
    `;

  db.query(selectQuery, [idfer], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("Jour Férié introuvable");
    }

    const ferie = data[0];

    return res.status(200).json(ferie);
  });
};

export const addFerie = (req, res) => {
  const idfer = uuidv4();
  const checkQuery = "SELECT * FROM ferie WHERE titre = ?";
  db.query(checkQuery, [req.body.titre], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Jour Férie existe deja");

    const { titre, dateDebutFerie, dateFinFerie } = req.body;
    const insertQuery = `INSERT INTO ferie (idfer, titre, dateDebutFerie, dateFinFerie) VALUES (?, ?, ?, ?)`;
    const values = [idfer, titre, dateDebutFerie, dateFinFerie];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json("Jour Ferie ajoutée");
    });
  });
};

export const updateFerie = (req, res) => {
  const { titre, dateDebutFerie, dateFinFerie } = req.body;
  const idfer = req.params.id;

  const updateQuery = `
      UPDATE ferie
      SET titre = ?, dateDebutFerie = ?, dateFinFerie = ?
      WHERE idfer = ?
    `;
  const values = [titre, dateDebutFerie, dateFinFerie, idfer];

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("Jour Férié introuvable");
    }

    return res.status(200).json("Jour Férié mis à jour");
  });
};

export const deleteFerie = (req, res) => {
  const idfer = req.params.id;

  const deleteQuery = `
      DELETE FROM ferie
      WHERE idfer = ?
    `;

  db.query(deleteQuery, [idfer], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json("Jour Férié introuvable");
    }

    return res.status(200).json("Jour Férié supprimé");
  });
};
