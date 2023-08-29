import { makeRequest } from "../../../axios";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRef, useContext } from "react";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import { AiFillBank, AiFillEye, AiOutlinePrinter } from "react-icons/ai";
import PageTitle from "../../../components/PageTitle";
import { AuthContext } from "../../../context/AuthContext";

const CurrentEmpSal = () => {
  const { currentUser } = useContext(AuthContext);

  // api get call
  const { isLoading, error, data } = useQuery({
    queryKey: ["curSalaireEmp"],
    queryFn: () =>
      makeRequest.get(`/sal/empSal/${currentUser.immatricule}`).then((res) => {
        return res.data;
      }),
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Historique Salaire" icon={AiFillBank} />

      <div className="flex items-center justify-between  gap-3 p-2 ">
        <button
          onClick={handlePrint}
          className="bg-gray-500 rounded-lg text-white hover:bg-gray-600 p-2 font-semibold flex gap-1 items-center justify-center"
        >
          <AiOutlinePrinter className="text-xl" />
          <span> Imprimer</span>
        </button>
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
            {data && data.length === 0 ? (
              <tr className="text-center ">
                <td className="p-4" colSpan={3}>
                  Aucun Record
                </td>
              </tr>
            ) : (
              data?.map((sal) => {
                return (
                  <tr
                    key={sal.idPaiment}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{sal.immatricule}</td>
                    <td className="px-6 py-4">{sal.NumCompte}</td>
                    <td className="px-6 py-4">
                      {sal.rappelNet !== null ? sal.rappelNet.toFixed(2) : ""}
                    </td>
                    <td>
                      {sal.netMensuel !== null ? sal.netMensuel.toFixed(2) : ""}
                    </td>
                    <td className="px-6 py-4">
                      {moment(sal.dateP).format("MM-D-YYYY")}
                    </td>
                    <td className="px-6 py-4 flex align-middle  gap-2 print:hidden">
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

export default CurrentEmpSal;
