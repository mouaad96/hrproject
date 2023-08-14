import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { BsPencilSquare } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import PageTitle from "../../components/PageTitle";
import { NavLink } from "react-router-dom";
import ButtonLink from "../../components/ButtonLink";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const Famille = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["empFam"],
    queryFn: async () =>
      await makeRequest.get(`/fam/list`).then((res) => {
        return res.data;
      }),
    onError: (err) => {
      console.log(err);
    },
  });

  const deleteFamille = async (famId) => {
    try {
      await makeRequest.delete(`/fam/delete/${famId}`);
    } catch (error) {
      throw error;
    }
  };

  queryClient.invalidateQueries({ queryKey: ["empFam"] });

  const familleMutation = useMutation(deleteFamille, {
    onSuccess: () => {
      toast.info("Famille supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((des) =>
    des[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleDelete = (famId) => {
    familleMutation.mutate(famId);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Familles Des Employeurs" icon={MdFamilyRestroom} />

      <div className="flex items-center justify-between  gap-3 p-2">
        <ButtonLink
          text={"Ajouter Famille"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterFam"}
        />
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm" htmlFor="filter">
              Type De Filtre
            </label>
            <select
              id="filter"
              className="w-auto  py-2 px-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="prenomConj">Prénom Du Conjoint</option>
              <option value="nomConj">Nom Du Conjoint</option>
              <option value="immatricule">Immatricule</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={`Filtrer Par ${filterType}`}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-auto  pl-8 pr-4 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineSearch className="absolute top-3 left-3 text-gray-700" />
          </div>
        </div>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              immatricule Employeur
            </th>
            <th scope="col" className="px-6 py-3">
              prenom Conjoint
            </th>
            <th scope="col" className="px-6 py-3">
              nom Conjoint
            </th>
            <th scope="col" className="px-6 py-3">
              nombre Enfant
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((fam) => {
            return (
              <tr
                key={fam.idFam}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{fam.immatricule}</td>
                <td className="px-6 py-4">{fam.prenomConj}</td>
                <td className="px-6 py-4">{fam.nomConj}</td>
                <td className="px-6 py-4">{fam.nombreEnf}</td>
                <td className="px-6 py-4 flex gap-2">
                  <NavLink
                    to={`/UpdateFam/${fam.idFam}`}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    <BsPencilSquare className="text-2xl" />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(fam.idFam)}
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    <RxCross2 className="text-2xl" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Famille;
