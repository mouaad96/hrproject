import React, { useState } from "react";
import Input from "../../../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDown from "../../../components/DropDown";

const AjouterConge = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    motif: "",
    dateDebCong: "",
    joursCong: "",
    immatricule: "",
  });

  const getAllEmps = useQuery({
    queryKey: ["employ"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });

  const addConge = async (pres) => {
    try {
      await makeRequest.post(`/conge/create`, pres);
    } catch (err) {
      throw err;
    }
  };

  const addCongeMutation = useMutation(addConge);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    addCongeMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Congé Ajouter!");
        navigate("/Employeurs/Congés");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const allEmps = getAllEmps.data;

  return (
    <div className=" h-fit  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Congé</h1>
      <NavLink
        to={"/Employeurs/Congés"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="text"
            id="motif"
            name="motif"
            label="Motif"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="date"
            id="dateDebCong"
            name="dateDebCong"
            label="Date Debut Congé"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="joursCong"
            name="joursCong"
            label="Jours Congé"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="immatricule"
            id="immatricule"
            keyProp="immatricule"
            data={allEmps}
            value="immatricule"
            option="immatricule"
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

export default AjouterConge;
