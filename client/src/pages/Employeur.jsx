import { makeRequest } from "../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Employeur = () => {
  const queryClient = useQueryClient();

  const deleteItem = async (itemId) => {
    // Perform your deletion logic here, such as making an API call
    makeRequest.delete(`/emp/delete/${itemId}`);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["emp"],
    queryFn: () =>
      makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });
  queryClient.invalidateQueries({ queryKey: ["emp"] });
  const mutation = useMutation(deleteItem, {
    onSuccess: () => {
      toast.info("Employeur supprimé!");
    },
  });
  const handleDelete = (itemId) => {
    mutation.mutate(itemId);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <NavLink
        to={"/AjouterEmp"}
        className="bg-blue-500 self-start  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
      >
        Ajouter Un Employeur
      </NavLink>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              immatricule
            </th>
            <th scope="col" className="px-6 py-3">
              prenom
            </th>
            <th scope="col" className="px-6 py-3">
              nom
            </th>
            <th scope="col" className="px-6 py-3">
              tel
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((employee) => {
            return (
              <tr
                key={employee.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{employee.immatricule}</td>
                <td className="px-6 py-4">{employee.prenom}</td>
                <td className="px-6 py-4">{employee.nom}</td>
                <td className="px-6 py-4">{employee.tel}</td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    href={`#/:${employee.immatricule}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(employee.immatricule)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
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

export default Employeur;
