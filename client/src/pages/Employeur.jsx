import { useParams } from "react-router-dom";

const Employeur = () => {
  const { bID } = useParams();
  return <h1>Employeur / {bID}</h1>;
};

export default Employeur;
