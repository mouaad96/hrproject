import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const UpdateEmpGrade = () => {
  const { ima } = useParams();
  const [inputs, setInputs] = useState({
    immatricule: "",
    nom: "",
    prenom: "",
    echelle: "",
    echelant: "",
  });

  const getEmp = useQuery(["singleEmp", ima], async () => {
    const response = await makeRequest.get(`/emp/employeur/${ima}`);

    const { echelle, echelant, immatricule, nom, prenom } = response.data;

    setInputs((prevInputs) => ({
      ...prevInputs,
      immatricule,
      nom,
      prenom,
      echelle,
      echelant,
    }));
    return response.data;
  });

  const updateEmpGrade = async (empGrade) => {
    try {
      await makeRequest.put(`/emp/updateGrade/${ima}`, empGrade);
    } catch (err) {
      throw err;
    }
  };

  const getAllEchelle = useQuery({
    queryKey: ["echelle"],
    queryFn: async () =>
      await makeRequest.get(`/echelle/list`).then((res) => {
        return res.data;
      }),
  });

  const getAllEchelon = useQuery({
    queryKey: ["echelon"],
    queryFn: async () =>
      await makeRequest.get(`/echelant/list`).then((res) => {
        return res.data;
      }),
  });
  const echelles = getAllEchelle.data;
  const echelons = getAllEchelon.data;

  const updateEmpGradeMutation = useMutation(updateEmpGrade);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    updateEmpGradeMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("La Désignation D'employeur Est Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-fit  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour La Grade D'employeur</h1>
      <NavLink
        to={"/Employeurs/Grade"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="number"
            id="immatricule"
            name="immatricule"
            value={inputs.immatricule}
            label="Immatricule"
            isDisabled={true}
          />
        </div>
        <div className="mb-8">
          <Input
            type="text"
            id="nom"
            name="nom"
            value={inputs.nom}
            label="Nom"
          />
        </div>
        <div className="mb-8">
          <Input
            type="text"
            id="prenom"
            name="prenom"
            value={inputs.prenom}
            label="Prénom"
          />
        </div>
        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="echelle"
            id="echelle"
            defaultVal={inputs.echelle}
            keyProp="echelle"
            data={echelles}
            value="echelle"
            option="echelle"
          />
        </div>

        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="echelant"
            id="echelant"
            defaultVal={inputs.echelant}
            keyProp="echelant"
            data={echelons}
            value="echelant"
            option="echelant"
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
};

export default UpdateEmpGrade;
