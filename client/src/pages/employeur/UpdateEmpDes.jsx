import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const UpdateEmpDes = () => {
  const { ima } = useParams();
  const [inputs, setInputs] = useState({
    immatricule: "",
    nom: "",
    prenom: "",
    idDes: "",
  });

  const getEmp = useQuery(["singleEmp", ima], async () => {
    const response = await makeRequest.get(`/emp/employeur/${ima}`);

    const { idDes, immatricule, nom, prenom } = response.data;

    setInputs((prevInputs) => ({
      ...prevInputs,
      immatricule,
      nom,
      prenom,
      idDes,
    }));
    return response.data;
  });

  const updateEmpDes = async (empD) => {
    try {
      await makeRequest.put(`/emp/updateDes/${ima}`, empD);
    } catch (err) {
      throw err;
    }
  };

  const getAllDes = useQuery({
    queryKey: ["designations"],
    queryFn: async () =>
      await makeRequest.get(`/des/list`).then((res) => {
        return res.data;
      }),
  });
  const designations = getAllDes.data;

  const updateEmpDesMutation = useMutation(updateEmpDes);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    updateEmpDesMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("La Désignation D'employeur Est Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour La Désignation D'employeur</h1>
      <NavLink
        to={"/Désignation"}
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
            name="idDes"
            id="idDes"
            defaultVal={inputs.idDes}
            keyProp="idDes"
            data={designations}
            value="idDes"
            option="nomDes"
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

export default UpdateEmpDes;
