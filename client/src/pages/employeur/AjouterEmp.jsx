import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import myimg from "../../assets/avatar.jpg";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import FileBase64 from "react-file-base64";

const AjouterEmp = () => {
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

  const [inputs, setInputs] = useState({
    immatricule: "",
    nomCpt: "",
    mdp: "",
    prenom: "",
    nom: "",
    dateN: "",
    sexe: "Homme",
    adresse: "",
    tel: "",
    email: "",
    isAdmin: 0,
    idBureau: "",
    idDes: "",
    echelle: "",
    echelant: "",
    image: "",
    etatFam: "Célibataire",
  });

  const addEmployee = async (employee) => {
    try {
      await makeRequest.post(`/emp/create`, employee);
    } catch (err) {
      throw err;
    }
  };

  const etatFamilial = ["Célibataire", "Marrier", "Divorcer"];

  const addMutation = useMutation(addEmployee);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleProfilePictureChange = (file) => {
    setInputs((prev) => ({ ...prev, image: file.base64 }));
    setPreviewImage(file.base64);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

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
                  src={previewImage ? previewImage : myimg}
                  alt="human"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload file
                </label>
                <div className="block w-full file:py-3  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                  <FileBase64
                    multiple={false}
                    onDone={handleProfilePictureChange}
                  />
                </div>

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
                type="number"
                id="immatricule"
                name="immatricule"
                label="Immatricule"
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
                  handleChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Input
                  type="text"
                  id="nom"
                  label="Nom"
                  name="nom"
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="etatFam"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Situation Familial
              </label>
              <select
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="etatFam"
                id="etatFam"
              >
                {etatFamilial.map((etat, index) => {
                  return (
                    <option key={index} value={etat}>
                      {etat}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6">
              <Input
                type="date"
                id="dateN"
                name="dateN"
                label="Date De Naissance"
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <p className="text-white p-1">Sexe</p>
              <div className="flex items-center mb-4">
                <input
                  id="homme"
                  type="radio"
                  value="Homme"
                  name="sexe"
                  defaultChecked
                  onChange={handleChange}
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
                  id="femme"
                  type="radio"
                  value="Femme"
                  name="sexe"
                  onChange={handleChange}
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
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type="text"
                id="tel"
                name="tel"
                label="Télephone"
                handleChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Input
                type="email"
                id="email"
                name="email"
                label="Email"
                handleChange={handleChange}
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
              <Input
                type="text"
                id="nomCpt"
                name="nomCpt"
                label="Nom De Compte"
                handleChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <Input
                type="password"
                id="mdp"
                name="mdp"
                label="Mot De Passe"
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
          className="text-white self-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default AjouterEmp;
