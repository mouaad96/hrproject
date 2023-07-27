import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const Bureau = () => {
  const queryClient = useQueryClient();

  const deleteBureau = async (burId) => {
    makeRequest.delete(`/bur/delete/${burId}`);
  };

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
  });
  const handleDelete = (burId) => {
    deleteMutation.mutate(burId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering

  // Filtering logic based on filterText
  const filteredData = data?.filter((bur) => bur.intitule.includes(filterText));

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <NavLink
        to={"/AjouterBur"}
        className="bg-blue-500 self-start  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
      >
        Ajouter Une Département
      </NavLink>

      <input
        type="text"
        placeholder="Filtrer Par Nom Département"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
                      to={`/UpdateDep/${bur.idBureau}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(bur.idBureau)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
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
