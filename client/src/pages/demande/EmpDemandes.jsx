import { makeRequest } from "../../axios";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { BsCardChecklist } from "react-icons/bs";
import {} from "react-icons/rx";
import { AiFillEye, AiOutlinePrinter, AiOutlinePlus } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../../components/PageTitle";
import ButtonLink from "../../components/ButtonLink";

const EmpDemandes = () => {
  const { currentUser } = useContext(AuthContext);

  // Query for demande data

  const { isLoading, error, data } = useQuery({
    queryKey: ["empDem"],
    queryFn: async () => {
      const empDemResponse = await makeRequest.get(
        `/dem/empDem/${currentUser?.immatricule}`
      );
      return empDemResponse.data;
    },
  });

  // print logic
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg print:mx-4"
      ref={componentRef}
    >
      <div>
        <PageTitle title="List Des Demandes" icon={BsCardChecklist} />
        <div className="flex gap-1 print:hidden">
          <ButtonLink
            text={"Ajouter Une Demande"}
            icon={<AiOutlinePlus className="text-xl" />}
            nav={"/AjouterDem"}
          />
          <button
            onClick={handlePrint}
            className=" bg-gray-500 rounded-full text-white hover:bg-gray-600 p-2 font-semibold flex gap-1 items-center justify-center"
          >
            <AiOutlinePrinter className="text-xl" />
            <span> Imprimer</span>
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                immatricule
              </th>

              <th scope="col" className="px-6 py-3">
                demande
              </th>

              <th scope="col" className="px-6 py-3">
                date Demande
              </th>

              <th scope="col" className="px-6 py-3">
                statut Demande
              </th>

              <th scope="col" className="px-6 py-3 print:hidden">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 ? (
              <tr className="text-center ">
                <td className="p-6" colSpan={5}>
                  Pas De Demande
                </td>
              </tr>
            ) : (
              data?.map((dem) => {
                return (
                  <tr
                    key={dem.idDem}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{dem.immatricule}</td>
                    <td className="px-6 py-4">{dem.demande}</td>
                    <td className="px-6 py-4">
                      {moment(dem.dateDem).format("MM-DD-YYYY")}
                    </td>
                    <td className="px-6 py-4">{dem.statutDem}</td>

                    <td className="px-6 py-4 flex align-middle  gap-2 print:hidden">
                      <NavLink
                        to={`/Demande/${dem.idDem}`}
                        className="font-medium text-blue-600 hover:text-blue-500"
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

export default EmpDemandes;
