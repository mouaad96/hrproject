import React, { useState } from "react";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { toast } from "react-toastify";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import moment from "moment";

const UpdateSalaire = () => {
  const { salId } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    NumCompte: "",
    rappelNet: "",
    netMensuel: "",
    dateP: "",
    immatricule: "",
  });

  const getAllEmps = useQuery({
    queryKey: ["employs"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });

  const getDepartement = useQuery(["singleSal", salId], async () => {
    const response = await makeRequest.get(`/sal/salaire/${salId}`);

    const { NumCompte, rappelNet, netMensuel, dateP, immatricule } =
      response.data;
    const formattedDate = moment(dateP).format("YYYY-MM-DD");
    setInputs((prevInputs) => ({
      ...prevInputs,
      NumCompte,
      rappelNet,
      netMensuel,
      dateP: formattedDate,
      immatricule,
    }));
    return response.data;
  });

  const updateSalaire = async (sal) => {
    try {
      await makeRequest.put(`/sal/update/${salId}`, sal);
    } catch (err) {
      throw err;
    }
  };

  const updateSalMutation = useMutation(updateSalaire);

  const allEmps = getAllEmps.data;

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
    updateSalMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Salaire Mis A Jour!");
        navigate("/Employeurs/Paiements");
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      });
  };

  return (
    <div className=" h-fit  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour Le Salaire</h1>
      <NavLink
        to={"/Employeurs/Paiements"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle  py-10">
        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="immatricule"
            id="immatricule"
            keyProp="immatricule"
            defaultVal={inputs.immatricule}
            data={allEmps}
            value="immatricule"
            option="immatricule"
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="NumCompte"
            name="NumCompte"
            value={inputs.NumCompte}
            label="Num Compte"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="rappelNet"
            name="rappelNet"
            value={inputs.rappelNet}
            label="Rappel Net"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="netMensuel"
            name="netMensuel"
            value={inputs.netMensuel}
            label="Net Mensuel"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="date"
            id="dateP"
            name="dateP"
            value={inputs.dateP}
            label="Date Paiement"
            handleChange={handleChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default UpdateSalaire;
