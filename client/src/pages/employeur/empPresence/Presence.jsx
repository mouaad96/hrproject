import { makeRequest } from "../../../axios";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";

import { BsPencilSquare, BsListCheck } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import ButtonLink from "../../../components/ButtonLink";
import PageTitle from "../../../components/PageTitle";

const Presence = () => {
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
    // presenceMutation.mutate(presId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((pres) =>
    pres[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="List De Presence" icon={BsListCheck} />

      <div className="flex items-center justify-between  gap-3 p-2 ">
        <ButtonLink
          text={"Ajouter Presence"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterPresence"}
        />
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm" htmlFor="filter">
              Type De Filtre
            </label>
            <select
              id="filter"
              className="w-auto  py-2 px-2  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <option value="nom">Nom</option>
              <option value="prenom">Prénom</option>
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
              immatricule
            </th>

            <th scope="col" className="px-6 py-3">
              nom
            </th>

            <th scope="col" className="px-6 py-3">
              prenom
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
                  <td className="px-6 py-4">{pres.nom}</td>
                  <td className="px-6 py-4">{pres.prenom}</td>
                  <td className="px-6 py-4">
                    {moment(pres.dateArr).format("MM-D-YYYY, HH:mm")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(pres.datePart).format("MM-D-YYYY, HH:mm")}
                  </td>
                  <td className="px-6 py-4 flex align-middle  gap-2">
                    <NavLink
                      to={`/UpdatePresence/${pres.idPres}`}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      <BsPencilSquare className="text-2xl" />
                    </NavLink>
                    <button
                      onClick={() => handleDelete(pres.idPresence)}
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
  );
};

export default Presence;
