import React from "react";
import { NavLink } from "react-router-dom";

import PageTitle from "../components/PageTitle";

import { makeRequest } from "../axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import DropDown from "../components/DropDown";
import Input from "../components/Input";
import { BsListCheck, BsFillBuildingFill, BsBuildings } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineDesktop } from "react-icons/ai";
import { BiMessageAdd } from "react-icons/bi";
import { MdGridView, MdPeopleOutline, MdWork } from "react-icons/md";

//import ButtonLink from "../../components/ButtonLink";

const Home = () => {
  //? code Ajout Presence start
  const [inputs, setInputs] = useState({
    dateArr: "",
    datePart: "",
    immatricule: "",
  });

  const getAllEmps = useQuery({
    queryKey: ["emplo"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });

  const addPresence = async (pres) => {
    try {
      await makeRequest.post(`/presence/create`, pres);
    } catch (err) {
      throw err;
    }
  };

  const addDesMutation = useMutation(addPresence);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);

    addDesMutation
      .mutateAsync(inputs) // Use mutateAsync to await the Promise returned by addEmployee
      .then(() => {
        // This block will run if the API call is successful

        toast.info("Presence Ajouter!");
      })
      .catch((error) => {
        // This block will run if the API call encounters an error
        toast.error(error.response.data);
      });
  };

  const allEmps = getAllEmps.data;

  //? code ajout presence end

  const queryClient = useQueryClient();

  const deletePresence = async (presId) => {
    try {
      await makeRequest.delete(`/presence/delete/${presId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["presence"],
    queryFn: () =>
      makeRequest.get(`/presence/list`).then((res) => {
        return res.data;
      }),
  });
  queryClient.invalidateQueries({ queryKey: ["presence"] });

  const presenceMutation = useMutation(deletePresence, {
    onSuccess: () => {
      toast.info("Département supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (presId) => {
    presenceMutation.mutate(presId);
  };

  // filter logic
  const [filterText, setFilterText] = useState("");
  const filteredData = data?.filter((pres) =>
    pres.immatricule.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  // count api calls

  const getDesignations = useQuery({
    queryKey: ["des"],
    queryFn: async () =>
      await makeRequest.get(`/des/list`).then((res) => {
        return res.data;
      }),
  });

  const getEmployeurs = useQuery({
    queryKey: ["emp"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });

  const getBureaux = useQuery({
    queryKey: ["bur"],
    queryFn: async () =>
      await makeRequest.get(`/bur/list`).then((res) => {
        return res.data;
      }),
  });

  const getSubDeps = useQuery({
    queryKey: ["subDep"],
    queryFn: async () =>
      await makeRequest.get(`/subDep/list`).then((res) => {
        return res.data;
      }),
  });

  const getDepartements = useQuery({
    queryKey: ["bur"],
    queryFn: async () =>
      await makeRequest.get(`/dep/list`).then((res) => {
        return res.data;
      }),
  });

  const getDemandes = useQuery({
    queryKey: ["bur"],
    queryFn: async () =>
      await makeRequest.get(`/dem/list`).then((res) => {
        return res.data;
      }),
  });

  const desCount = getDesignations.data;
  const empCount = getEmployeurs.data;
  const burCount = getBureaux.data;
  const subDepCount = getSubDeps.data;
  const depCount = getDepartements.data;
  const demCount = getDemandes.data;

  return (
    <div className="m-3">
      <div>
        <div className="flex">
          <PageTitle title="Aperçu Général" icon={MdGridView} />
        </div>
        <div className="lg:grid-cols-3 grid gap-2 sm:grid-cols-1 md:grid-cols-2 ">
          <NavLink
            className="rounded-lg"
            to="/Employeurs/Liste%20Des%20Employeurs"
          >
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <MdPeopleOutline className="text-3xl bg-emerald-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Employeurs</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {empCount?.length}
              </span>
            </div>
          </NavLink>
          <NavLink className="rounded-lg" to="/Départements/Liste">
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <BsFillBuildingFill className="text-3xl bg-orange-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Départements</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {depCount?.length}
              </span>
            </div>
          </NavLink>
          <NavLink className="rounded-lg" to="/Départements/Sous%20Département">
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <BsBuildings className="text-3xl bg-gray-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Sous-Départements</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {subDepCount?.length}
              </span>
            </div>
          </NavLink>
          <NavLink className="rounded-lg" to="/Désignation">
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <MdWork className="text-3xl bg-red-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Désignations</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {desCount?.length}
              </span>
            </div>
          </NavLink>
          <NavLink className="rounded-lg" to="/Demandes">
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <BiMessageAdd className="text-3xl bg-yellow-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Demandes</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {demCount?.length}
              </span>
            </div>
          </NavLink>
          <NavLink className="rounded-lg" to="/Bureaux">
            <div className="flex items-center gap-2 p-5 justify-center flex-col bg-white shadow-lg text-black font-bold uppercase rounded-lg ">
              <AiOutlineDesktop className="text-3xl bg-purple-600 rounded-full w-9 h-9 p-1 text-white" />
              <p>Bureaux</p>
              <span className="font-extrabold text-3xl text-blue-600">
                {burCount?.length}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
      <div>
        <div className="flex ">
          <PageTitle title="List De Presence" icon={BsListCheck} />
        </div>
        <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
          <div className="mx-2 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder={`Filtrer Par Immatricule`}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-auto  pl-8 pr-4 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AiOutlineSearch className="absolute top-3 left-3 text-gray-700" />
            </div>
          </div>

          <div className="flex overflow-y-hidden gap-1 min-[96]:">
            <div className="flex-2">
              <div className="max-h-96 overflow-y-auto scrollbar">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        immatricule
                      </th>

                      <th scope="col" className="px-6 py-3">
                        nom Complet
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Date Arrivé
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date Sorti
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData?.length === 0 ? (
                      <tr className="text-center ">
                        <td className="p-4" colSpan={3}>
                          Pas De Presence
                        </td>
                      </tr>
                    ) : (
                      filteredData?.map((pres) => {
                        return (
                          <tr
                            key={pres.idPres}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-6 py-4">{pres.immatricule}</td>
                            <td className="px-6 py-4">
                              {pres.nom} {pres.prenom}
                            </td>

                            <td className="px-6 py-4">
                              {moment(pres.dateArr).format("MM-D-YYYY, HH:mm")}
                            </td>
                            <td className="px-6 py-4">
                              {moment(pres.datePart).format("MM-D-YYYY, HH:mm")}
                            </td>
                            <td className="px-6 py-4 flex align-middle  gap-2">
                              <button
                                onClick={() => handleDelete(pres.idPres)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                <RxCross2 className="text-2xl" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex-1">
              <div className=" h-auto  bg-gray-800 flex flex-col align-middle rounded-md">
                <form className="flex flex-col justify-center align-middle p-5">
                  <div className="mb-8">
                    <Input
                      type="time"
                      id="dateArr"
                      name="dateArr"
                      label="Temp Arrivé"
                      handleChange={handleChange}
                    />
                  </div>

                  <div className="mb-8">
                    <Input
                      type="time"
                      id="datePart"
                      name="datePart"
                      label="Temp Sorti"
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
                    className="text-white self-center  px-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto  py-2 text-center"
                  >
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
