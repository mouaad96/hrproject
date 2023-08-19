import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import ButtonLink from "../../components/ButtonLink";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import PageTitle from "../../components/PageTitle";

const Bureau = () => {
  const queryClient = useQueryClient();

  async function deleteBureau(burId) {
    try {
      await makeRequest.delete(`/bur/delete/${burId}`);
    } catch (error) {
      // Handle any errors that might occur during the API call.
      throw error; // Rethrow the error to trigger the `onError` callback in the `useMutation` hook.
    }
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["bureau"],
    queryFn: () =>
      makeRequest.get(`/bur/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });
  queryClient.invalidateQueries({ queryKey: ["bureau"] });

  const deleteMutation = useMutation(deleteBureau, {
    onSuccess: () => {
      toast.info("Bureau supprimé!");
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        toast.error(
          "Impossible de supprimer le bureau car un employé l'occupe."
        );
      } else {
        toast.error(
          "Une erreur est survenue lors de la suppression du bureau."
        );
      }
    },
  });

  const handleDelete = (burId) => {
    deleteMutation.mutate(burId);
  };

  const [filterText, setFilterText] = useState("");
  const filteredData = data?.filter((bur) =>
    bur.intitule.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Liste Des Bureaux" icon={AiOutlineUnorderedList} />
      <div className="flex items-center justify-between  gap-3 p-2 ">
        <ButtonLink
          text={"Ajouter Un Bureau"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterBur"}
        />
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder={`Filtrer Par Intitule`}
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
              Code Bureau
            </th>

            <th scope="col" className="px-6 py-3">
              Intitule Bureau
            </th>

            <th scope="col" className="px-6 py-3">
              étage
            </th>

            <th scope="col" className="px-6 py-3">
              sous département associé
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
                Bureau Inexistant
              </td>
            </tr>
          ) : (
            filteredData?.map((bur) => {
              return (
                <tr
                  key={bur.idBureau}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{bur.idBureau}</td>
                  <td className="px-6 py-4">{bur.intitule}</td>
                  <td className="px-6 py-4">{bur.etagere}</td>
                  <td className="px-6 py-4">{bur.nomSubDep}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <NavLink
                      to={`/UpdateBur/${bur.idBureau}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <BsPencilSquare className="text-2xl" />
                    </NavLink>
                    <button
                      onClick={() => handleDelete(bur.idBureau)}
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

export default Bureau;
