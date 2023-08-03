import { makeRequest } from "../../../axios";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import { MdRemoveRedEye, MdPlaylistRemove } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import ButtonLink from "../../../components/ButtonLink";
import PageTitle from "../../../components/PageTitle";

const Conge = () => {
  const queryClient = useQueryClient();

  const deletePresence = async (congeId) => {
    try {
      await makeRequest.delete(`/conge/delete/${congeId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["conge"],
    queryFn: () =>
      makeRequest.get(`/conge/list`).then((res) => {
        return res.data;
      }),
  });
  queryClient.invalidateQueries({ queryKey: ["conge"] });

  const congeMutation = useMutation(deletePresence, {
    onSuccess: () => {
      toast.info("Congé supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (presId) => {
    congeMutation.mutate(presId);
  };

  // filter method
  const [filterText, setFilterText] = useState(""); // State variable for filtering

  // Filtering logic based on filterText
  const filteredData = data?.filter((cong) =>
    cong.immatricule.toString().includes(filterText)
  );

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Liste Des Congés" icon={MdPlaylistRemove} />

      <div className="flex items-center justify-between  gap-3 p-2 ">
        <ButtonLink
          text={"Ajouter Congé"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterConge"}
        />

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

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              immatricule
            </th>

            <th scope="col" className="px-6 py-3">
              motif
            </th>

            <th scope="col" className="px-6 py-3">
              date Debut Congé
            </th>

            <th scope="col" className="px-6 py-3">
              date fin Congé
            </th>
            <th scope="col" className="px-6 py-3">
              jours congé
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
                Pas De Congé
              </td>
            </tr>
          ) : (
            filteredData?.map((conge) => {
              return (
                <tr
                  key={conge.idCong}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{conge.immatricule}</td>
                  <td className="px-6 py-4">{conge.motif}</td>
                  <td className="px-6 py-4">
                    {moment(conge.dateDebCong).format("MM-D-YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(conge.dateFinCong).format("MM-D-YYYY")}
                  </td>
                  <td className="px-6 py-4">{conge.joursCong}</td>

                  <td className="px-6 py-4 flex gap-2">
                    <NavLink
                      to={`/UpdateDes/${conge.idCong}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <MdRemoveRedEye className="text-2xl" />
                    </NavLink>
                    <button
                      onClick={() => handleDelete(conge.idCong)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
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

export default Conge;
