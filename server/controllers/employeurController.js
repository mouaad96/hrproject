import { db } from "../db/connect.js";
import bcryptjs from "bcryptjs";

export const addEmp = (req, res) => {
  // check if logged in
  const token = req.cookies.accessToken;
  console.log(token);
  //check if emp exists
  const q = "SELECT * FROM employeur WHERE nomCpt = ?";
  db.query(q, [req.body.nomCpt], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("employeur existe deja");
    //create new emp
    // hash password

    const salt = bcryptjs.genSaltSync(10);
    const hashedPass = bcryptjs.hashSync(req.body.mdp, salt);

    const q =
      "INSERT INTO employeur (`immatricule`,`nomCpt`, `mdp`, `prenom`, `nom`, `dateN`, `sexe`, `adresse`, `tel`, `email`,`isAdmin`, `idBureau`,`idDes`, `idGrade`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
      req.body.idGrade,
    ];

    db.query(
      q,
      values,
      (err,
      (data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      })
    );
  });
};

export const getEmp = (req, res) => {
  const q = "SELECT * FROM employeur";
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
    isAdmin,
    idBureau,
    idDes,
    idGrade,
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
    isAdmin = ?,
    idBureau = ?,
    idDes = ?,
    idGrade = ?
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
    isAdmin ? 1 : 0,
    idBureau,
    idDes,
    idGrade,
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
  SELECT e.immatricule, e.prenom, e.nom, b.intitule, b.etagere, b.idSd
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
