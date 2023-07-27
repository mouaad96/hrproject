import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const Departement = () => {
  const queryClient = useQueryClient();

  const deleteItem = async (depId) => {
    // Perform your deletion logic here, such as making an API call
    makeRequest.delete(`/dep/delete/${depId}`);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["depart"],
    queryFn: () =>
      makeRequest.get(`/dep/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });
  queryClient.invalidateQueries({ queryKey: ["depart"] });

  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      toast.info("Département supprimé!");
    },
  });
  const handleDelete = (depId) => {
    mutation.mutate(depId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering

  // Filtering logic based on filterText
  const filteredData = data?.filter((dep) => dep.nomDep.includes(filterText));

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <NavLink
        to={"/AjouterDep"}
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
              Code Département
            </th>

            <th scope="col" className="px-6 py-3">
              Nom Département
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
                Département Inexistant
              </td>
            </tr>
          ) : (
            filteredData?.map((dep) => {
              return (
                <tr
                  key={dep.idDep}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{dep.idDep}</td>
                  <td className="px-6 py-4">{dep.nomDep}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <NavLink
                      to={`/UpdateDep/${dep.idDep}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(dep.idDep)}
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

export default Departement;
