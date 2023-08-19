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

  const [filterText, setFilterText] = useState("");
  const filteredData = data?.filter((des) =>
    des.nomDes.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Liste Des Désignations" icon={AiOutlineUnorderedList} />
      <div className="flex items-center justify-between  gap-3 p-2 ">
        <ButtonLink
          text={"Ajouter Désignation"}
          icon={<AiOutlinePlus className="text-xl" />}
          nav={"/AjouterDes"}
        />
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder={`Filtrer Par Désignation`}
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
                      <BsPencilSquare className="text-2xl" />
                    </NavLink>
                    <button
                      onClick={() => handleDelete(des.idDes)}
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

export default Designation;
