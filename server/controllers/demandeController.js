import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

export const getDemandes = (req, res) => {
  const q = "SELECT * FROM demandes ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getDemandeById = (req, res) => {
  const idDem = req.params.id;
  const selectQuery = `
        SELECT *
        FROM demandes
        WHERE idDem = ?
      `;
  db.query(selectQuery, [idDem], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("Demande introuvable");
    }
    const demande = data[0];
    return res.status(200).json(demande);
  });
};

export const getEmployeurDemandes = (req, res) => {
  const immatricule = req.params.id;
  const selectQuery = `
        SELECT *
        FROM demandes
        WHERE immatricule = ?
      `;
  db.query(selectQuery, [immatricule], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).send("pas de demandes");
    }

    return res.send(data);
  });
};

export const addDemande = (req, res) => {
  const idDem = uuidv4();
  const { demande, motif, dateDem, statutDem, immatricule } = req.body;
  const insertQuery = `INSERT INTO demandes (idDem, demande, motif, dateDem, statutDem , immatricule) 
                        VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [idDem, demande, motif, dateDem, statutDem, immatricule];
  db.query(insertQuery, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json("Demande ajoutée");
  });
};

export const updateDemande = (req, res) => {
  const { statutDem } = req.body;
  const idDem = req.params.id;

  const updateQuery = `
      UPDATE demandes
      SET statutDem = ? 
      WHERE idDem = ?
    `;
  const values = [statutDem, idDem];

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json("état demande est mis à jour");
  });
};

export const deleteDemande = (req, res) => {
  const idDem = req.params.id;
  const deleteQuery = `
        DELETE FROM demandes
        WHERE idDem = ?
      `;
  db.query(deleteQuery, [idDem], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Demande introuvable");
    }
    return res.status(200).json("Demande supprimé");
  });
};
