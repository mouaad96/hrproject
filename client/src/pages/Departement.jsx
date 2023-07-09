import { useParams } from "react-router-dom";

const Departement = () => {
  const { aID } = useParams();
  return <h1>Departements / {aID}</h1>;
};

export default Departement;
