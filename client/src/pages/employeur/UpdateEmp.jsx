import React, { useEffect, useRef, useState } from "react";
import myimg from "../../assets/avatar.jpg";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const UpdateEmp = () => {
  const { empId } = useParams();

  const handleSubmit = () => {};

  const getBureaux = useQuery({
    queryKey: ["bur"],
    queryFn: async () =>
      await makeRequest.get(`/bur/list`).then((res) => {
        return res.data;
      }),
  });

  const getDesignations = useQuery({
    queryKey: ["des"],
    queryFn: async () =>
      await makeRequest.get(`/des/list`).then((res) => {
        return res.data;
      }),
  });

  const getEchelles = useQuery({
    queryKey: ["echelle"],
    queryFn: async () =>
      await makeRequest.get(`/echelle/list`).then((res) => {
        return res.data;
      }),
  });

  const getEchelants = useQuery({
    queryKey: ["echelant"],
    queryFn: async () =>
      await makeRequest.get(`/echelant/list`).then((res) => {
        return res.data;
      }),
  });
  const [inputs, setInputs] = useState({
    prenom: "",
    nom: "",
    dateN: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",

    idBureau: "",
    idDes: "",
    echelle: "",
    echelant: "",
  });

  const getEmployee = useQuery(["singleEmp", empId], async () => {
    const response = await makeRequest.get(`/emp/employeur/${empId}`);
    const {
      immatricule,
      prenom,
      nom,
      dateN,
      sexe,
      adresse,
      tel,
      email,
      idBureau,
      idDes,
      echelle,
      echelant,
    } = response.data;
    const formattedDateN = dateN
      ? new Date(dateN).toISOString().slice(0, 10)
      : "";
    // Set the state with the updated values using the previous state
    setInputs((prevInputs) => ({
      ...prevInputs,
      immatricule,
      prenom,
      nom,
      dateN: formattedDateN,
      sexe,
      adresse,
      tel,
      email,
      idBureau,
      idDes,
      echelle,
      echelant,
    }));
    return response.data; // Return the data to react-query
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  const bureaux = getBureaux.data;
  const designations = getDesignations.data;
  const echelles = getEchelles.data;
  const echelants = getEchelants.data;
  const selectedEmp = getEmployee.data;
  //const dateNai = moment(selectedEmp?.dateN).format("YYYY-MM-DD");

  //const parsedDate = parseISO(selectedEmp?.dateN);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A Jour Un Employeur</h1>
      <NavLink
        to={"/Employeurs/Liste%20Des%20Employeurs"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="flex p-3">
          <div className="border-r-2 p-8 ">
            <p className="text-white">Information Personel</p>
          </div>
          <div className="flex-1 px-5">
            <div className="py-10">
              <div className="flex  justify-center">
                <img
                  className="w-36 h-36   rounded-full  object-fill "
                  src={myimg}
                  alt="human"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full file:py-3  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>
            <div className="mb-6">
              <Input
                isDisabled={true}
                type="number"
                id="immatricule"
                name="immatricule"
                label="Immatricule"
                value={inputs.immatricule}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6 flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  id="prenom"
                  label="Prenom"
                  name="prenom"
                  value={inputs.prenom}
                  handleChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Input
                  type="text"
                  id="nom"
                  label="Nom"
                  name="nom"
                  value={inputs.nom}
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <Input
                type="date"
                id="dateN"
                label="Date De Naissance"
                name="dateN"
                value={inputs.dateN}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <p className="text-white p-1">Sexe</p>
              <div className="flex items-center mb-4">
                <input
                  onChange={handleChange}
                  checked={inputs.sexe === "Homme"}
                  id="homme"
                  type="radio"
                  value="Homme"
                  name="sexe"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="homme"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Homme
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={inputs.sexe === "Femme"}
                  id="femme"
                  type="radio"
                  value="Femme"
                  onChange={handleChange}
                  name="sexe"
                  className="w-4 h-4  bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="femme"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
                >
                  Femme
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-50 my-3"></div>
        <div className="flex p-3">
          <div className="border-r-2 p-5 ">
            <p className="text-white">Information De Contact</p>
          </div>
          <div className="flex-1 px-5">
            <div className="mb-6">
              <Input
                type="text"
                id="adresse"
                name="adresse"
                label="Adresse"
                value={inputs.adresse}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type="text"
                id="tel"
                name="tel"
                label="Télephone"
                value={inputs.tel}
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type="email"
                id="email"
                name="email"
                label="Email"
                value={inputs.email}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-50 my-3"></div>
        <div className="flex p-3">
          <div className="border-r-2 p-5 ">
            <p className="text-white">Information Sur Le Role</p>
          </div>
          <div className="flex-1 px-5">
            <div className="mb-6">
              <DropDown
                handleChange={handleChange}
                name="idBureau"
                defaultVal={inputs.idBureau}
                id="bureau"
                keyProp="idBureau"
                data={bureaux}
                value="idBureau"
                option="intitule"
              />
            </div>

            <div className="mb-6">
              <DropDown
                handleChange={handleChange}
                name="idDes"
                defaultVal={inputs.idDes}
                id="désignation"
                keyProp="idDes"
                data={designations}
                value="idDes"
                option="nomDes"
              />
            </div>
            <div className="mb-10 flex gap-3">
              <div className="flex-1">
                <DropDown
                  handleChange={handleChange}
                  name="echelle"
                  defaultVal={inputs.echelle}
                  id="echelle"
                  keyProp="echelle"
                  data={echelles}
                  value="echelle"
                  option="echelle"
                />
              </div>
              <div className="flex-1">
                <DropDown
                  handleChange={handleChange}
                  name="echelant"
                  defaultVal={inputs.echelant}
                  id="echelant"
                  keyProp="echelant"
                  data={echelants}
                  value="echelant"
                  option="echelant"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateEmp;
