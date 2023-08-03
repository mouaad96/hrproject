import { db } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";

export const getConge = (req, res) => {
  const q = `SELECT * FROM conge`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addConge = (req, res) => {
  const { motif, dateDebCong, joursCong, immatricule } = req.body;
  const idCong = uuidv4();
  const parsedJoursCong = parseInt(joursCong, 10);
  // Fetch holidays from the 'ferie' table in the database
  const sql = `SELECT dateDebutFerie, dateFinFerie FROM ferie`;
  db.query(sql, (err, holidays) => {
    if (err) {
      console.error("Error fetching holidays:", err.message);
      res
        .status(500)
        .json({ error: "Failed to fetch holidays from the database." });
    } else {
      // Check the sum of joursCong for the specified employee
      const sumJoursCongQuery = `SELECT SUM(joursCong) AS totalJoursCong FROM conge WHERE immatricule = ?`;
      db.query(sumJoursCongQuery, [immatricule], (sumErr, result) => {
        if (sumErr) {
          console.error("Error calculating sum of joursCong:", sumErr.message);
          res
            .status(500)
            .json({ error: "Failed to calculate sum of joursCong." });
        } else {
          const totalJoursCong = result[0].totalJoursCong || 0; // Handle the case when there are no records yet
          const newTotalJoursCong = totalJoursCong + parsedJoursCong;

          if (newTotalJoursCong > 22) {
            return res
              .status(400)
              .send("The total number of vacation days cannot exceed 22.");
          }
          // Calculate dateFinCong by excluding weekends and holidays
          const dateDeb = new Date(dateDebCong);
          const dateFin = addBusinessDaysWithHolidays(
            dateDeb,
            joursCong,
            holidays
          );
          const insertSql = `INSERT INTO conge (idCong, motif, dateDebCong, dateFinCong, joursCong, immatricule) 
                             VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [
            idCong,
            motif,
            dateDebCong,
            dateFin,
            parsedJoursCong,
            immatricule,
          ];

          db.query(insertSql, values, (insertErr, result) => {
            if (insertErr) {
              res
                .status(500)
                .send("Failed to insert data into the conge table.");
            } else {
              res.status(200).send("Congé Ajoute!");
            }
          });
        }
      });
    }
  });
};

// delete congé
export const deleteConge = (req, res) => {
  const idCg = req.params.id;
  const q = `
      DELETE FROM conge
      WHERE idcong = ?
    `;
  db.query(q, idCg, (err, results) => {
    if (err) {
      res.status(500).send("Erreur suppression");
    } else {
      res.send("Congé Supprimer");
    }
  });
};

// Function to calculate dateFinCong by excluding weekends and holidays
function isHoliday(dateToCheck, holidays) {
  //const formattedDateToCheck = dateToCheck.toISOString().slice(0, 10);
  for (const holiday of holidays) {
    const holidayStart = new Date(holiday.dateDebutFerie);
    const holidayEnd = new Date(holiday.dateFinFerie);

    if (dateToCheck >= holidayStart && dateToCheck <= holidayEnd) {
      return true;
    }
  }

  return false;
}

function addBusinessDaysWithHolidays(startDate, numDays, holidays) {
  let date = new Date(startDate);
  let businessDaysToAdd = numDays;

  while (businessDaysToAdd > 0) {
    date.setDate(date.getDate() + 1);

    if (
      date.getDay() !== 0 &&
      date.getDay() !== 6 &&
      !isHoliday(date, holidays)
    ) {
      // Check if the current day is not a Sunday (0), Saturday (6), or holiday.
      businessDaysToAdd--;
    }
  }

  return date;
}
