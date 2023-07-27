import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const SousDep = () => {
  const queryClient = useQueryClient();
  const deleteSubDep = async (depId) => {
    // Perform your deletion logic here, such as making an API call
    makeRequest.delete(`/subDep/delete/${depId}`);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["subDep"],
    queryFn: () =>
      makeRequest.get(`/subDep/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });

  queryClient.invalidateQueries({ queryKey: ["subDep"] });

  const mutation = useMutation(deleteSubDep, {
    onSuccess: () => {
      toast.info("Sous Département supprimé!");
    },
  });
  const handleDelete = (depId) => {
    mutation.mutate(depId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterChoice, setFilterChoice] = useState("Nom Sous Département");

  // Filtering logic based on filterText
  const filteredData = data?.filter((dep) => {
    if (filterChoice === "Nom Sous Département") {
      return dep.nomSubDep.includes(filterText);
    }
    if (filterChoice === "Code Sous Département") {
      return dep.idSd.toString().includes(filterText);
    }
  });

  return (
    <div>
      <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
        <NavLink
          to={"/AjouterSubDep"}
          className="bg-blue-500 self-start  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
        >
          Ajouter Sous Département
        </NavLink>

        <input
          type="text"
          placeholder={`Filtrer Par ${filterChoice}`}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code Sous Département
              </th>

              <th scope="col" className="px-6 py-3">
                Nom Sous Département
              </th>
              <th scope="col" className="px-6 py-3">
                Département Associé
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
                  Sous Département Inexistant
                </td>
              </tr>
            ) : (
              filteredData?.map((subDep) => {
                return (
                  <tr
                    key={subDep.idSd}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{subDep.idSd}</td>
                    <td className="px-6 py-4">{subDep.nomSubDep}</td>
                    <td className="px-6 py-4">{subDep.nomDep}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <NavLink
                        to={`/UpdateSubDep/${subDep.idSd}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => handleDelete(subDep.idSd)}
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
    </div>
  );
};

export default SousDep;
