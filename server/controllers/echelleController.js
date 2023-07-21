import { db } from "../db/connect.js";
export const getEchelle = (req, res) => {
  const q = "SELECT * FROM echelle ";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
