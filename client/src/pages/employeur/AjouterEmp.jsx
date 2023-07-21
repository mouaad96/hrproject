import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import myimg from "../../assets/avatar.jpg";

const AjouterEmp = () => {
  const addEmployee = async (employee) => {
    try {
      await makeRequest.post(`/emp/create`, employee);
    } catch (err) {
      throw err;
    }
  };

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

  const bureaux = getBureaux.data;
  const designations = getDesignations.data;
  const echelles = getEchelles.data;
  const echelants = getEchelants.data;

  const addMutation = useMutation(addEmployee);

  const [inputs, setInputs] = useState({
    immatricule: "",
    nomCpt: "",
    mdp: "",
    prenom: "",
    nom: "",
    dateN: "",
    sexe: "",
    adresse: "",
    tel: "",
    email: "",
    isAdmin: 0,
    idBureau: "",
    idDes: "",
    echelle: "",
    echelant: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(inputs);
    addMutation
      .mutateAsync(inputs) // Use mutateAsync to await the Promise returned by addEmployee
      .then(() => {
        // This block will run if the API call is successful
        toast.info("Employeur Ajouter!");
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Ajouter Un Employeur</h1>
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
              <label
                htmlFor="immatricule"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                immatricule
              </label>
              <input
                onChange={handleChange}
                type="number"
                id="immatricule"
                name="immatricule"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 flex gap-2">
              <div className="flex-1">
                <label
                  htmlFor="prenom"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prenom
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="prenom"
                  name="prenom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="nom"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="nom"
                  name="nom"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="dateN"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date De Naissance
              </label>
              <input
                onChange={handleChange}
                type="date"
                id="dateN"
                name="dateN"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-6" onChange={handleChange}>
              <p className="text-white p-1">Sexe</p>
              <div className="flex items-center mb-4">
                <input
                  id="homme"
                  type="radio"
                  value="Homme"
                  name="sexe"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-0 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                  id="femme"
                  type="radio"
                  value="Femme"
                  name="sexe"
                  className="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-0  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
              <label
                htmlFor="adresse"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Adresse
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="adresse"
                name="adresse"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="rue 3 deb..."
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="tel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Téléphone
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="tel"
                name="tel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0677882074"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@gmail.com"
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-50 my-3"></div>
        <div className="flex p-3">
          <div className="border-r-2 p-5 ">
            <p className="text-white">Information Du Compte</p>
          </div>
          <div className="flex-1 px-5">
            <div className="mb-6">
              <label
                htmlFor="nomCpt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nom de Compte
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="nomCpt"
                name="nomCpt"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mot De Passe
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="mdp"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
              <label
                htmlFor="idBur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bureau
              </label>
              <select
                id="idBur"
                onChange={handleChange}
                name="idBureau"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">--selectionez un bureau--</option>
                {bureaux?.map((bur) => {
                  return (
                    <option key={bur.idBureau} value={bur.idBureau}>
                      {bur.intitule}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="idDes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Désignation
              </label>
              <select
                id="idDes"
                onChange={handleChange}
                name="idDes"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">--selectionez une Désignation--</option>
                {designations?.map((des) => {
                  return (
                    <option key={des.idDes} value={des.idDes}>
                      {des.nomDes}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-10 flex gap-3">
              <div className="flex-1">
                <label
                  htmlFor="echelle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Echelle
                </label>
                <select
                  id="echelle"
                  onChange={handleChange}
                  name="echelle"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">--selectionez un Echelle--</option>
                  {echelles?.map((echelle) => {
                    return (
                      <option key={echelle.echelle} value={echelle.echelle}>
                        {echelle.echelle}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="echelant"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Echelant
                </label>
                <select
                  id="echelant"
                  onChange={handleChange}
                  name="echelant"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">--selectionez un Echelant--</option>
                  {echelants?.map((echelant) => {
                    return (
                      <option key={echelant.echelant} value={echelant.echelant}>
                        {echelant.echelant}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AjouterEmp;
