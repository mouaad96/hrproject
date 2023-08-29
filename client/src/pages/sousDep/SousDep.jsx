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

const SousDep = () => {
  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext);

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

  const [filterText, setFilterText] = useState("");
  const filteredData = data?.filter((subDep) =>
    subDep.nomSubDep.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
        <PageTitle
          title="Liste Des Sous-Départements"
          icon={AiOutlineUnorderedList}
        />
        <div className="flex items-center justify-between  gap-3 p-2 ">
          {currentUser.isAdmin ? (
            <ButtonLink
              text={"Ajouter Sous Département"}
              icon={<AiOutlinePlus className="text-xl" />}
              nav={"/AjouterSubDep"}
            />
          ) : (
            ""
          )}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder={`Filtrer Par Sous-Dép`}
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
                Code Sous Département
              </th>

              <th scope="col" className="px-6 py-3">
                Nom Sous Département
              </th>
              <th scope="col" className="px-6 py-3">
                Département Associé
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
                    {currentUser.isAdmin ? (
                      <td className="px-6 py-4 flex gap-2">
                        <NavLink
                          to={`/UpdateSubDep/${subDep.idSd}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <BsPencilSquare className="text-2xl" />
                        </NavLink>
                        <button
                          onClick={() => handleDelete(subDep.idSd)}
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

export default SousDep;
