import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

export const addFamille = (req, res) => {
  //check if employee already has a family
  const q = `SELECT * FROM famille WHERE immatricule = ?`;
  db.query(q, [req.body.immatricule], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res
        .status(409)
        .json("La famille de l'employeur est deja enregistrer");
    const { prenomConj, nomConj, nombreEnf, immatricule } = req.body;
    const idFam = uuidv4();
    const q = `INSERT INTO famille(idFam, prenomConj, nomConj, nombreEnf, immatricule) VALUES(?,?,?,?,?)`;
    const values = [idFam, prenomConj, nomConj, nombreEnf, immatricule];
    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Famille ajouter");
      })
    );
  });
};

export const getFamille = (req, res) => {
  const q = `SELECT * FROM famille `;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFamilleById = (req, res) => {
  const idFam = req.params.id;
  const selectQuery = `
          SELECT *
          FROM famille
          WHERE idFam = ?
        `;
  db.query(selectQuery, [idFam], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("famille introuvable");
    }
    const famille = data[0];
    return res.status(200).json(famille);
  });
};

export const deleteFamille = (req, res) => {
  const idFam = req.params.id;
  const deleteQuery = `
          DELETE FROM famille
          WHERE idFam = ?
        `;
  db.query(deleteQuery, [idFam], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json("Famille introuvable");
    }
    return res.status(200).json("Famille supprimé");
  });
};

export const updateFamille = (req, res) => {
  const { prenomConj, nomConj, nombreEnf, immatricule } = req.body;
  const idFam = req.params.id;

  // Vérification si l'immatricule fourni existe déjà pour un autre employé
  const requeteVerifImmatricule = `
    SELECT COUNT(*) AS empFam
    FROM famille
    WHERE immatricule = ? AND idFam <> ?
  `;
  const valeursVerifImmatricule = [immatricule, idFam];

  db.query(
    requeteVerifImmatricule,
    valeursVerifImmatricule,
    (errVerif, resultatVerif) => {
      if (errVerif) {
        return res.status(500).json(errVerif);
      }

      if (resultatVerif[0].empFam > 0) {
        return res
          .status(400)
          .json(
            "L'immatricule de l'employé existe déjà pour une autre famille"
          );
      }

      // Requête de mise à jour des informations de la famille
      const requeteMiseAJour = `
      UPDATE famille
      SET prenomConj = ?, nomConj = ?, nombreEnf = ?, immatricule = ?
      WHERE idFam = ?
    `;
      const valeursMiseAJour = [
        prenomConj,
        nomConj,
        nombreEnf,
        immatricule,
        idFam,
      ];

      db.query(
        requeteMiseAJour,
        valeursMiseAJour,
        (errMiseAJour, resultatMiseAJour) => {
          if (errMiseAJour) {
            return res.status(500).json(errMiseAJour);
          }

          if (resultatMiseAJour.affectedRows === 0) {
            return res.status(404).json("Famille introuvable");
          }

          return res.status(200).json("Famille mise à jour !");
        }
      );
    }
  );
};
