import { makeRequest } from "../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ButtonLink from "../components/ButtonLink";
import { useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineOrderedList,
  AiFillEye,
} from "react-icons/ai";
import PageTitle from "../components/PageTitle";

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

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((emp) =>
    emp[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Liste Des Employeurs" icon={AiOutlineOrderedList} />
      <div className="flex items-center justify-between  gap-3 p-2 ">
        <ButtonLink
          text={"Ajouter Employeur"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterEmp"}
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
        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
        <tbody className="text-center">
          {filteredData?.map((employee) => {
            return (
              <tr
                key={employee.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{employee.immatricule}</td>

                <td className="px-6 py-4">{employee.prenom}</td>
                <td className="px-6 py-4">{employee.nom}</td>
                <td className="px-6 py-4">{employee.tel}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <NavLink
                    to={`/UpdateEmp/${employee.immatricule}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <BsPencilSquare className="text-2xl" />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(employee.immatricule)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <RxCross2 className="text-2xl" />
                  </button>
                  <NavLink
                    to={`/SingleEmp/${employee.immatricule}`}
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    <AiFillEye className="text-2xl" />
                  </NavLink>
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
