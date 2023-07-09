import { useParams } from "react-router-dom";

const Bureau = () => {
  const { brID } = useParams();
  return <h1>Bureau / {brID}</h1>;
};

export default Bureau;
