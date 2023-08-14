import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

function AjouterFamille() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    prenomConj: "",
    nomConj: "",
    nombreEnf: "",
    immatricule: "",
  });

  const getAllEmps = useQuery({
    queryKey: ["emps"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });

  const emps = getAllEmps.data;

  const MarriedOrDivorcedEmployees = emps?.filter(
    (emp) =>
      emp.etatFam.toLowerCase().includes("marrier") ||
      emp.etatFam.toLowerCase().includes("divorcer")
  );

  const addFamille = async (fam) => {
    try {
      await makeRequest.post(`/fam/create`, fam);
    } catch (err) {
      throw err;
    }
  };

  const addFamilleMutation = useMutation(addFamille);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    addFamilleMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Famille Ajouter!");
        navigate("/Employeurs/Famille");
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Famille</h1>
      <NavLink
        to={"/Employeurs/Famille"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="immatricule"
            id="immatricule"
            keyProp="immatricule"
            data={MarriedOrDivorcedEmployees}
            value="immatricule"
            option="immatricule"
          />
        </div>
        <div className="mb-8">
          <Input
            type="text"
            id="prenomConj"
            name="prenomConj"
            label="Prénom Conjoint"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="text"
            id="nomConj"
            name="nomConj"
            label="Nom Conjoint"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="nombreEnf"
            name="nombreEnf"
            label="Nombre Enfants"
            handleChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
}

export default AjouterFamille;
