import { makeRequest } from "../../axios";
import { Navigate, NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import moment from "moment";

import { BsPencilSquare, BsFillCalendarEventFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import ButtonLink from "../../components/ButtonLink";
import PageTitle from "../../components/PageTitle";
import { AuthContext } from "../../context/AuthContext";

const Ferie = () => {
  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext);

  const deleteFerie = async (ferId) => {
    //api call
    try {
      await makeRequest.delete(`/fer/delete/${ferId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["ferie"],
    queryFn: () =>
      makeRequest.get(`/fer/list`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });
  queryClient.invalidateQueries({ queryKey: ["ferie"] });

  const ferieMutation = useMutation(deleteFerie, {
    onSuccess: () => {
      toast.info("Ferie supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (ferId) => {
    ferieMutation.mutate(ferId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering

  // Filtering logic based on filterText
  const filteredData = data?.filter((des) => des.titre.includes(filterText));
  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Jours De Férie" icon={BsFillCalendarEventFill} />

      <div className="flex items-center justify-between  gap-3 p-2 ">
        {currentUser.isAdmin ? (
          <ButtonLink
            text={"Ajouter Férie"}
            icon={<AiOutlinePlus className="text-xl" />}
            nav={"/AjouterFer"}
          />
        ) : (
          ""
        )}

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

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              intitule
            </th>

            <th scope="col" className="px-6 py-3">
              date Debut
            </th>

            <th scope="col" className="px-6 py-3">
              date fin
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
                Intitule Inexistant
              </td>
            </tr>
          ) : (
            filteredData?.map((fer) => {
              return (
                <tr
                  key={fer.idfer}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{fer.titre}</td>
                  <td className="px-6 py-4">
                    {moment(fer.dateDebutFerie).format("MM-D-YYYY")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(fer.dateFinFerie).format("MM-D-YYYY")}
                  </td>
                  {currentUser.isAdmin ? (
                    <td className="px-6 py-4 flex gap-2">
                      <NavLink
                        to={`/UpdateFer/${fer.idfer}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <BsPencilSquare className="text-2xl" />
                      </NavLink>
                      <button
                        onClick={() => handleDelete(fer.idfer)}
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
  );
};

export default Ferie;
