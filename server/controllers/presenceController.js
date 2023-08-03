import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

//get presence

export const getPresence = (req, res) => {
  const q = `SELECT  emp.immatricule, emp.nom, emp.prenom, p.dateArr, p.datePart, p.idPres
            FROM presence p
            JOIN employeur emp
            ON p.immatricule = emp.immatricule`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// get one presence

export const getPresenceById = (req, res) => {
  const idPre = req.params.id;
  const q = `SELECT * FROM presence WHERE idPres = ?`;

  db.query(q, [idPre], (err, results) => {
    if (err) {
      res.status(500).send("Erreur selection presence");
    } else if (results.length === 0) {
      res.status(404).send("pas de presence");
    } else {
      res.send(results[0]);
    }
  });
};

// add presence
export const addPresence = (req, res) => {
  const { dateArr, datePart, immatricule } = req.body;

  // Check if all required fields are provided in the request body
  if (!dateArr || !datePart || !immatricule) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if the immatricule exists in the employeur table (you should have a table called "employeur")
  const selectQuery = "SELECT immatricule FROM employeur WHERE immatricule = ?";
  db.query(selectQuery, [immatricule], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Immatricule not found." });
    }

    // Get the current date as a string in "YYYY-MM-DD" format
    const today = new Date().toISOString().slice(0, 10);

    // Check if there is already a presence record for the given immatricule and today's date
    const existingPresenceQuery =
      "SELECT idPres FROM presence WHERE immatricule = ? AND dateArr >= ? AND datePart <= ?";
    db.query(
      existingPresenceQuery,
      [immatricule, `${today} 00:00:00`, `${today} 23:59:59`],
      (err, presenceResults) => {
        if (err) {
          console.error("Error querying the database:", err);
          return res.status(500).json({ error: "Database error." });
        }

        if (presenceResults.length > 0) {
          return res
            .status(400)
            .send(
              "Un employeur ne peut avoir qu'un seul enregistrement de présence par jour."
            );
        }

        // Generate a UUID for the presence record
        const idPres = uuidv4();

        // Set the time portion of dateArr and datePart to be "00:00:00" and "23:59:59", respectively
        const fullDateArr = `${today} ${dateArr}`;
        const fullDatePart = `${today} ${datePart}`;

        // Check if dateArr is greater than 8:30 AM
        const arrTime = new Date(fullDateArr).getTime();
        const eightThirtyAM = new Date(fullDateArr).setHours(8, 30, 0, 0);
        if (arrTime < eightThirtyAM) {
          return res
            .status(400)
            .send("La Date D'arrivée  Doit Être Supérieur A 8:30.");
        }

        // Check if datePart is greater than dateArr (compare time values only)
        const arrTimeValue = new Date(fullDateArr).getTime();
        const partTimeValue = new Date(fullDatePart).getTime();
        if (partTimeValue <= arrTimeValue) {
          return res
            .status(400)
            .send("Date Sorti Doit Être Supérieur A La Date D'arrivée.");
        }

        // Check if datePart is not greater than 6:00 PM (18:00)
        const sixPM = new Date(today).setHours(18, 0, 0, 0);
        if (partTimeValue > sixPM) {
          return res
            .status(400)
            .send("La Date De  Départ Ne Doit Pas Être Inférieur à 18h00.");
        }

        // If all checks pass, proceed with the insertion into the "presence" table
        const insertQuery =
          "INSERT INTO presence (idPres, dateArr, datePart, immatricule) VALUES (?, ?, ?, ?)";
        db.query(
          insertQuery,
          [idPres, fullDateArr, fullDatePart, immatricule],
          (err) => {
            if (err) {
              console.error("Error inserting data into the database:", err);
              return res.status(500).json({ error: "Failed to insert data." });
            }

            return res.status(201).json({ message: "Présence Ajouté" });
          }
        );
      }
    );
  });
};

// update presence method

export const updatePresence = (req, res) => {
  const { dateArr, datePart, immatricule } = req.body;
  const idP = req.params.id;

  // Check if all required fields are provided in the request body
  if (!dateArr || !datePart || !immatricule) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if the immatricule exists in the employeur table (you should have a table called "employeur")
  const selectQuery = "SELECT immatricule FROM employeur WHERE immatricule = ?";
  db.query(selectQuery, [immatricule], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ error: "Database error." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Immatricule not found." });
    }

    // Get the current date as a string in "YYYY-MM-DD" format
    const today = new Date().toISOString().slice(0, 10);

    // Set the time portion of dateArr and datePart to be "00:00:00" and "23:59:59", respectively
    const fullDateArr = `${today} ${dateArr}`;
    const fullDatePart = `${today} ${datePart}`;

    // Check if dateArr is greater than 8:30 AM
    const arrTime = new Date(fullDateArr).getTime();
    const eightThirtyAM = new Date(fullDateArr).setHours(8, 30, 0, 0);
    if (arrTime < eightThirtyAM) {
      return res
        .status(400)
        .send("La Date D'arrivée  Doit Être Supérieur A 8:30.");
    }

    // Check if datePart is greater than dateArr (compare time values only)
    const arrTimeValue = new Date(fullDateArr).getTime();
    const partTimeValue = new Date(fullDatePart).getTime();
    if (partTimeValue <= arrTimeValue) {
      return res
        .status(400)
        .send("Date Sorti Doit Être Supérieur A La Date D'arrivée.");
    }

    // Check if datePart is not greater than 6:00 PM (18:00)
    const sixPM = new Date(today).setHours(18, 0, 0, 0);
    if (partTimeValue > sixPM) {
      return res
        .status(400)
        .send("La Date De  Départ Ne Doit Pas Être Inférieur à 18h00.");
    }

    // If all checks pass, proceed with the update in the "presence" table
    const updateQuery =
      "UPDATE presence SET dateArr = ?, datePart = ?, immatricule = ? WHERE idPres = ?";
    db.query(
      updateQuery,
      [fullDateArr, fullDatePart, immatricule, idP],
      (err) => {
        if (err) {
          console.error("Error updating data in the database:", err);
          return res.status(500).json({ error: "Failed to update data." });
        }

        return res.status(200).send("Présence Mis à jour avec succés.");
      }
    );
  });
};
