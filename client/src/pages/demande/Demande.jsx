import { makeRequest } from "../../axios";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import { BsPencilSquare, BsListCheck, BsCardChecklist } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineSearch, AiFillEye } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import ButtonLink from "../../components/ButtonLink";
import PageTitle from "../../components/PageTitle";

const Demande = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const deleteDemande = async (demId) => {
    try {
      await makeRequest.delete(`/dem/delete/${demId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["demande"],
    queryFn: () =>
      makeRequest.get(`/dem/list`).then((res) => {
        return res.data;
      }),
  });
  queryClient.invalidateQueries({ queryKey: ["demande"] });

  const demandeMutation = useMutation(deleteDemande, {
    onSuccess: () => {
      toast.info("Demande supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (demId) => {
    demandeMutation.mutate(demId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((dem) =>
    dem[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="List Des Demandes" icon={BsCardChecklist} />

      <div
        className={`flex items-center ${
          currentUser.isAdmin ? "justify-end" : "justify-between"
        } gap-3 p-2 `}
      >
        {!currentUser.isAdmin && (
          <ButtonLink
            text={"Ajouter Demande"}
            icon={<AiOutlinePlus className="text-xl" />}
            nav={"/AjouterDem"}
          />
        )}

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
              <option value="immatirule">Immatricule</option>

              <option value="demande">Demande</option>
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
      <div className="max-h-96 overflow-y-auto scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                immatricule
              </th>

              <th scope="col" className="px-6 py-3">
                demande
              </th>

              <th scope="col" className="px-6 py-3">
                date Demande
              </th>

              <th scope="col" className="px-6 py-3">
                statut Demande
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr className="text-center ">
                <td className="p-6" colSpan={5}>
                  Pas De Demande
                </td>
              </tr>
            ) : (
              filteredData?.map((dem) => {
                return (
                  <tr
                    key={dem.idDem}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{dem.immatricule}</td>
                    <td className="px-6 py-4">{dem.demande}</td>
                    <td className="px-6 py-4">
                      {moment(dem.dateDem).format("MM-DD-YYYY")}
                    </td>
                    <td className="px-6 py-4">{dem.statutDem}</td>

                    <td className="px-6 py-4 flex align-middle  gap-2">
                      <NavLink
                        to={`/UpdatePresence/${dem.idDem}`}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        <AiFillEye className="text-2xl" />
                      </NavLink>
                      <button
                        onClick={() => handleDelete(dem.idDem)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        {dem.statutDem === "En Attente" ? (
                          <RxCross2 className="text-2xl" />
                        ) : (
                          ""
                        )}
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
  );
};

export default Demande;
