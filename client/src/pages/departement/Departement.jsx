import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext, useState } from "react";

import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import ButtonLink from "../../components/ButtonLink";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import PageTitle from "../../components/PageTitle";
import { AuthContext } from "../../context/AuthContext";

const Departement = () => {
  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext);

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

  const [filterText, setFilterText] = useState("");
  const filteredData = data?.filter((emp) =>
    emp.nomDep.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Liste Des Départements" icon={AiOutlineUnorderedList} />
      <div className="flex items-center justify-between  gap-3 p-2 ">
        {currentUser.isAdmin ? (
          <ButtonLink
            text={"Ajouter Département"}
            icon={<AiOutlinePlus className="text-xl" />}
            nav={"/AjouterDep"}
          />
        ) : (
          ""
        )}
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder={`Filtrer Par Nom Dép`}
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code Département
              </th>

              <th scope="col" className="px-6 py-3">
                Nom Département
              </th>

              {currentUser.isAdmin ? (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              ) : (
                ""
              )}
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
                    {currentUser.isAdmin ? (
                      <td className="px-6 py-4 flex gap-2">
                        <NavLink
                          to={`/UpdateDep/${dep.idDep}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <BsPencilSquare className="text-2xl" />
                        </NavLink>
                        <button
                          onClick={() => handleDelete(dep.idDep)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          <RxCross2 className="text-2xl" />
                        </button>
                      </td>
                    ) : (
                      ""
                    )}
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

export default Departement;
