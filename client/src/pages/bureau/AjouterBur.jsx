import React, { useState } from "react";
import Input from "../../components/Input";
import { NavLink, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DropDown from "../../components/DropDown";

const AjouterBur = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    idBureau: "",
    intitule: "",
    etagere: "",
    idSd: "",
  });

  const getAllSubDeps = useQuery({
    queryKey: ["subDeparts"],
    queryFn: async () =>
      await makeRequest.get(`/subDep/list`).then((res) => {
        return res.data;
      }),
  });

  const subDeps = getAllSubDeps.data;

  const addBureau = async (bureau) => {
    try {
      await makeRequest.post(`/bur/create`, bureau);
    } catch (err) {
      throw err;
    }
  };

  const addBureauMutation = useMutation(addBureau);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);

    addBureauMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Bureau Ajouter!");
        navigate("/Bureaux/Liste Des Bureaux");
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };
  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Bureau</h1>
      <NavLink
        to={"/Bureaux/Liste Des Bureaux"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="number"
            id="idBureau"
            name="idBureau"
            label="Numero De Bureau"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="text"
            id="intitule"
            name="intitule"
            label="Intitule De Bureau"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <Input
            type="number"
            id="etagere"
            name="etagere"
            label="étage De Bureau"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <DropDown
            handleChange={handleChange}
            name="idSd"
            id="idSd"
            keyProp="idSd"
            data={subDeps}
            value="idSd"
            option="nomSubDep"
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

export default AjouterBur;
