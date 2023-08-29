import { makeRequest } from "../../../axios";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState, useRef, useContext } from "react";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

import { BsPencilSquare } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import {
  AiOutlinePlus,
  AiOutlineSearch,
  AiFillBank,
  AiFillEye,
  AiOutlinePrinter,
} from "react-icons/ai";

import ButtonLink from "../../../components/ButtonLink";
import PageTitle from "../../../components/PageTitle";
import { AuthContext } from "../../../context/AuthContext";

const Salaire = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const deleteSalaire = async (salId) => {
    try {
      await makeRequest.delete(`/sal/delete/${salId}`);
    } catch (error) {
      throw error;
    }
  };

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["salaire"],
    queryFn: () =>
      makeRequest.get(`/sal/list`).then((res) => {
        return res.data;
      }),
  });
  queryClient.invalidateQueries({ queryKey: ["salaire"] });

  const salaireMutation = useMutation(deleteSalaire, {
    onSuccess: () => {
      toast.info("Salaire supprimé!");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  const handleDelete = (salId) => {
    salaireMutation.mutate(salId);
  };

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((pres) =>
    pres[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="List Des Salaires" icon={AiFillBank} />

      <div className="flex items-center justify-between  gap-3 p-2 ">
        <div className="flex gap-1">
          <ButtonLink
            text={"Ajouter Salaire"}
            icon={<AiOutlinePlus className="text-xl" />}
            nav={"/AjouterSalaire"}
          />
          <button
            onClick={handlePrint}
            className="bg-gray-500 rounded-full text-white hover:bg-gray-600 p-2 font-semibold flex gap-1 items-center justify-center"
          >
            <AiOutlinePrinter className="text-xl" />
            <span> Imprimer</span>
          </button>
        </div>
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
              <option value="immatricule">Immatricule</option>
              <option value="NumCompte">Num Compte</option>
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
      <div
        className="max-h-96 overflow-y-auto scrollbar print:px-4  "
        ref={componentRef}
      >
        <div className="hidden print:block">
          <PageTitle title="List Des Salaires" />
        </div>
        <table className="w-full text-sm text-left text-gray-400 print:text-black print:border-2 border-gray-700">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                immatricule
              </th>

              <th scope="col" className="px-6 py-3">
                NumCompte
              </th>

              <th scope="col" className="px-6 py-3">
                rappelNet
              </th>

              <th scope="col" className="px-6 py-3">
                netMensuel
              </th>

              <th scope="col" className="px-6 py-3">
                dateP
              </th>

              <th scope="col" className="px-6 py-3 print:hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length === 0 ? (
              <tr className="text-center ">
                <td className="p-4" colSpan={3}>
                  Aucun Record
                </td>
              </tr>
            ) : (
              filteredData?.map((sal) => {
                return (
                  <tr
                    key={sal.idPaiment}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{sal.immatricule}</td>
                    <td className="px-6 py-4">{sal.NumCompte}</td>
                    <td className="px-6 py-4">{sal.rappelNet.toFixed(2)}</td>
                    <td className="px-6 py-4">{sal.netMensuel.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {moment(sal.dateP).format("MM-D-YYYY")}
                    </td>
                    <td className="px-6 py-4 flex align-middle  gap-2 print:hidden">
                      {!(currentUser.immatricule === sal.immatricule) && (
                        <>
                          <NavLink
                            to={`/UpdateSalaire/${sal.idPaiment}`}
                            className="font-medium text-blue-600 hover:text-blue-500"
                          >
                            <BsPencilSquare className="text-2xl" />
                          </NavLink>
                          <button
                            onClick={() => handleDelete(sal.idPaiment)}
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            <RxCross2 className="text-2xl" />
                          </button>
                        </>
                      )}

                      <NavLink
                        to={`/singleSal/${sal.immatricule}`}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        <AiFillEye className="text-2xl" />
                      </NavLink>
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

export default Salaire;
