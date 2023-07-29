import { db } from "../db/connect.js";
import bcryptjs from "bcryptjs";

export const addEmp = (req, res) => {
  //check if emp exists
  const q = "SELECT * FROM employeur WHERE nomCpt = ?";
  db.query(q, [req.body.nomCpt], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("employeur existe deja");

    // hash password
    const salt = bcryptjs.genSaltSync(10);
    const hashedPass = bcryptjs.hashSync(req.body.mdp, salt);
    //create new emp

    const q = `INSERT INTO employeur 
    (
      immatricule,
        nomCpt, 
        mdp,
        prenom,
        nom,
        dateN,
        sexe, 
        adresse, 
        tel, 
        email,
        isAdmin,
        idBureau,
        idDes,
        echelle, 
        echelant,
        image,
        etatFam
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    const values = [
      req.body.immatricule,
      req.body.nomCpt,
      hashedPass, // hashed pass
      req.body.prenom,
      req.body.nom,
      req.body.dateN,
      req.body.sexe,
      req.body.adresse,
      req.body.tel,
      req.body.email,
      req.body.isAdmin,
      req.body.idBureau,
      req.body.idDes,
      req.body.echelle,
      req.body.echelant,
      req.body.image,
      req.body.etatFam,
    ];

    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("employeur ajouter");
      })
    );
  });
};

export const getEmp = (req, res) => {
  const q = "SELECT * FROM employeur WHERE isAdmin =0";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getEmpById = (req, res) => {
  const immatricule = req.params.id;
  const q = `
  SELECT *
  FROM employeur
  WHERE immatricule = ?
`;
  db.query(q, immatricule, (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection employeur");
    } else if (results.length === 0) {
      res.status(404).send("Employeur n'exist pas");
    } else {
      res.send(results[0]);
    }
  });
};

export const updateEmp = (req, res) => {
  const immatricule = req.params.id;
  const {
    prenom,
    nom,
    dateN,
    sexe,
    adresse,
    tel,
    email,
    idBureau,
    idDes,
    echelle,
    echelant,
    image,
    etatFam,
  } = req.body;
  const q = `
  UPDATE employeur
  SET
    prenom = ?,
    nom = ?,
    dateN = ?,
    sexe = ?,
    adresse = ?,
    tel = ?,
    email = ?,
    idBureau = ?,
    idDes = ?,
    echelle = ?,
    echelant = ?,
    image = ?,
    etatFam = ?
  WHERE immatricule = ?
`;
  const values = [
    prenom,
    nom,
    dateN,
    sexe,
    adresse,
    tel,
    email,
    idBureau,
    idDes,
    echelle,
    echelant,
    image,
    etatFam,
    immatricule,
  ];

  db.query(q, values, (err, results) => {
    if (err) {
      res.status(500).send("Erreur de mise a jour");
    } else {
      res.send("Employeur et mis a jour");
    }
  });
};

export const deleteEmp = (req, res) => {
  const immatricule = req.params.id;
  const q = `
    DELETE FROM employeur
    WHERE immatricule = ?
  `;
  db.query(q, immatricule, (err, results) => {
    if (err) {
      res.status(500).send("Erreur suppression");
    } else {
      res.send("Employeur supprimer");
    }
  });
};

export const getEmpDesignation = (req, res) => {
  const q = `
  SELECT e.immatricule, e.prenom, e.nom, d.nomDes
  FROM employeur e
  JOIN designation d ON e.idDes = d.idDes

`;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).send("Erreur designation");
    } else {
      res.send(results);
    }
  });
};

export const getEmpBureau = (req, res) => {
  const q = `
  SELECT b.idBureau, e.immatricule, e.prenom, e.nom, b.intitule
  FROM employeur e
  JOIN bureau b ON e.idBureau = b.idBureau
`;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).send("Erreur bureau emp");
    } else {
      res.send(results);
    }
  });
};

export const getEmpGrade = (req, res) => {
  const q = `SELECT emp.immatricule, emp.prenom, emp.nom, e.echelle, ec.echelant 
            FROM employeur emp
            JOIN echelle e
            ON emp.echelle = e.echelle
            JOIN echelant ec
            ON emp.echelant = ec.echelant`;

  db.query(q, (err, results) => {
    if (err) {
      res.status(500).send("Erreur grade emp");
    } else {
      res.send(results);
    }
  });
};
