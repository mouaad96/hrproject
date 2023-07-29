import { useQuery } from "@tanstack/react-query";
import React from "react";
import { makeRequest } from "../../axios";

const EmployeurGrade = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["empgrad"],
    queryFn: async () =>
      await makeRequest.get(`/emp/empGrade`).then((res) => {
        return res.data;
      }),
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
              Échelle
            </th>
            <th scope="col" className="px-6 py-3">
              Échelon
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((empGr) => {
            return (
              <tr
                key={empGr.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{empGr.immatricule}</td>
                <td className="px-6 py-4">{empGr.prenom}</td>
                <td className="px-6 py-4">{empGr.nom}</td>
                <td className="px-6 py-4">{empGr.echelle}</td>
                <td className="px-6 py-4">{empGr.echelant}</td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    href={`#/:${empGr.immatricule}`}
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

export default EmployeurGrade;
