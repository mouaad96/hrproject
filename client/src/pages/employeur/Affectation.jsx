import { useQuery } from "@tanstack/react-query";
import React from "react";
import { makeRequest } from "../../axios";

const Affectation = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["empDes"],
    queryFn: async () =>
      await makeRequest.get(`/emp/empBur`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Immatricule
            </th>
            <th scope="col" className="px-6 py-3">
              prenom
            </th>
            <th scope="col" className="px-6 py-3">
              nom
            </th>
            <th scope="col" className="px-6 py-3">
              Intitule de bureau
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((burAffec) => {
            return (
              <tr
                key={burAffec.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{burAffec.immatricule}</td>
                <td className="px-6 py-4">{burAffec.prenom}</td>
                <td className="px-6 py-4">{burAffec.nom}</td>
                <td className="px-6 py-4">{burAffec.intitule}</td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    href={`#/:${burAffec.immatricule}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Affectation;
