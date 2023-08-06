import React, { useContext, useEffect, useState } from "react";
import {
  AiFillLock,
  AiFillSave,
  AiFillSetting,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import PageTitle from "../components/PageTitle";
import ButtonLink from "../components/ButtonLink";
import FileBase64 from "react-file-base64";
import myimg from "../assets/avatar.jpg";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import { makeRequest } from "../axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Compte = () => {
  const { currentUser } = useContext(AuthContext);

  const formatedDate = moment(currentUser?.dateN, "YYYY/MM/DD").format(
    "YYYY-MM-DD"
  );

  const [inputs, setInputs] = useState({
    immatricule: currentUser?.immatricule || "",
    prenom: currentUser?.prenom || "",
    nom: currentUser?.nom || "",
    dateN: formatedDate || "",
    sexe: currentUser?.sexe || "",
    adresse: currentUser?.adresse || "",
    tel: currentUser?.tel || "",
    email: currentUser?.email || "",
    idBureau: currentUser?.idBureau || "",
    idDes: currentUser?.idDes || "",
    echelle: currentUser?.echelle || "",
    echelant: currentUser?.echelant || "",
    image: currentUser?.image || "",
    etatFam: currentUser?.etatFam || "",
  });

  // If the currentUser changes, update the inputs state accordingly
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      immatricule: currentUser?.immatricule || "",
      prenom: currentUser?.prenom || "",
      nom: currentUser?.nom || "",
      dateN: formatedDate || "",
      sexe: currentUser?.sexe || "",
      adresse: currentUser?.adresse || "",
      tel: currentUser?.tel || "",
      email: currentUser?.email || "",
      idBureau: currentUser?.idBureau || "",
      idDes: currentUser?.idDes || "",
      echelle: currentUser?.echelle || "",
      echelant: currentUser?.echelant || "",
      image: currentUser?.image || "",
      etatFam: currentUser?.etatFam || "",
    }));
  }, [currentUser]);

  const [activeButton, setActiveButton] = useState("button1");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const getButtonStyles = (buttonName) => {
    return `px-4 py-3 text-left
      ${
        activeButton === buttonName
          ? "bg-gray-300 text-gray-800 border-b-4 border-blue-400"
          : ""
      }
    `;
  };

  //console.log(currentUser);

  const updateEmployee = async (employee) => {
    try {
      await makeRequest.put(
        `/emp/update/${currentUser?.immatricule}`,
        employee
      );
    } catch (err) {
      throw err;
    }
  };
  const updateMutation = useMutation(updateEmployee);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfilePictureChange = (file) => {
    setInputs((prev) => ({ ...prev, image: file.base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);

    updateMutation
      .mutateAsync(inputs) // Use mutateAsync to await the Promise returned by addEmployee
      .then(() => {
        // This block will run if the API call is successful
        localStorage.setItem("user", JSON.stringify(inputs));
        toast.info("Profile Mis A Jour!");
        window.location.reload();
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };

  return (
    <>
      <div className="flex flex-grow overflow-hidden">
        <div className="flex flex-col h-screen bg-gray-200 ">
          <button
            onClick={() => handleButtonClick("button1")}
            className={getButtonStyles("button1")}
          >
            <span className="text-xl flex flex-row items-center">
              <AiFillSetting className="text-blue-600 text-2xl" /> Compte
            </span>
            <p className="text-sm">
              Mettre a jour les informations personnelles de votre compte
            </p>
          </button>
          <button
            onClick={() => handleButtonClick("button2")}
            className={getButtonStyles("button2")}
          >
            <span className="text-xl flex flex-row items-center">
              <AiFillLock className="text-blue-600 text-2xl" /> Sécurité
            </span>
            <p className="text-sm">
              Mettre a jour le mot de passe de votre compte
            </p>
          </button>
        </div>
        {activeButton === "button1" ? (
          <form className="bg-gray-700 w-full p-4  overflow-y-scroll h-screen">
            <PageTitle
              title={"Informations Personnelles"}
              color={"text-gray-200"}
            />

            <div className="py-10">
              <div className="flex  justify-center">
                <img
                  className="w-32 h-32  rounded-full  object-fill "
                  src={inputs.image ? inputs.image : myimg}
                  alt="human"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Photo De Profile
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
                  PNG ou JPG(MAX. 800x400px).
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="Immatricule"
                className="block mb-2 text-sm font-medium text-white "
              >
                Immatricule
              </label>
              <input
                type="text"
                id="Immatricule"
                className="text-yellow-600 cursor-not-allowed text-md font-bold rounded-lg block w-full p-2.5 bg-gray-500 border outline-none border-yellow-500"
                name="immatricule"
                value={inputs.immatricule}
                disabled
                readOnly
              />
              <p className="mt-2 text-sm text-yellow-500">
                Vous Ne Pouvez Pas Change Votre Immatricule !
              </p>
            </div>

            <div className="mb-6 flex gap-2">
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  defaultValue={inputs.prenom}
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="prenom"
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  defaultValue={inputs.nom}
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="nom"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6 flex gap-2">
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  id="adresse"
                  defaultValue={inputs.adresse}
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="adresse"
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Date De Naissance
                </label>
                <input
                  type="date"
                  id="dateN"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="dateN"
                  defaultValue={inputs.dateN}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6 flex gap-2">
              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Téléphone
                </label>
                <input
                  type="text"
                  id="tel"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="tel"
                  defaultValue={inputs.tel}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <label
                  className="block mb-2 text-sm font-medium text-white"
                  htmlFor="tel"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent text-white"
                  name="email"
                  defaultValue={inputs.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6 flex flex-row items-center gap-2">
              <p className="text-white p-1">Sexe: </p>
              <div className="flex items-center ">
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
            <div className="flex gap-3 justify-center">
              <ButtonLink
                nav="/"
                text="Retourner a la page d'accueil"
                icon={<AiOutlineArrowLeft />}
              />
              <button
                className="bg-green-600 flex items-center justify-center hover:bg-green-700 text-white  font-semibold py-2 px-5 rounded-full"
                onClick={handleSubmit}
              >
                <AiFillSave />
                Enregistrer les Changements
              </button>
            </div>
          </form>
        ) : (
          <form className="bg-gray-700 w-full">
            <input type="text" />
          </form>
        )}
      </div>
    </>
  );
};

export default Compte;
