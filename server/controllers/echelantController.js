import { db } from "../db/connect.js";
export const getEchelant = (req, res) => {
  const q = "SELECT * FROM echelant ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
