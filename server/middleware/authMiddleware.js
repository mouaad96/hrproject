import jwt from "jsonwebtoken";
export const verifierConnexion = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("vous n'etes pas connecté");
  jwt.verify(token, "tokenSecretKey", (err, empInf) => {
    if (err) return res.status().json("token non valide");
    next();
  });
};
