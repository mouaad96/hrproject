import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const Designation = () => {
  const queryClient = useQueryClient();

  const deleteDesignation = async (desId) => {
    //api call
    try {
      await makeRequest.delete(`/des/delete/${desId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["des"],
    queryFn: () =>
      makeRequest.get(`/des/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });
  queryClient.invalidateQueries({ queryKey: ["des"] });

  const designationMutation = useMutation(deleteDesignation, {
    onSuccess: () => {
      toast.info("Département supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (depId) => {
    designationMutation.mutate(depId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering

  // Filtering logic based on filterText
  const filteredData = data?.filter((des) => des.nomDes.includes(filterText));
  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <NavLink
        to={"/AjouterDes"}
        className="bg-blue-500 self-start  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
      >
        Ajouter Une Désignation
      </NavLink>

      <input
        type="text"
        placeholder="Filtrer Par Nom Désignation"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full px-4 py-2 mb-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Code Désignation
            </th>

            <th scope="col" className="px-6 py-3">
              Nom Désignation
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
            filteredData?.map((des) => {
              return (
                <tr
                  key={des.idDes}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{des.idDes}</td>
                  <td className="px-6 py-4">{des.nomDes}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <NavLink
                      to={`/UpdateDes/${des.idDes}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(des.idDes)}
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

export default Designation;
