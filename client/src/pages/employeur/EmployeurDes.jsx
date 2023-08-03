import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { makeRequest } from "../../axios";
import { BsPencilSquare, BsLink45Deg } from "react-icons/bs";

import { AiOutlineSearch } from "react-icons/ai";
import PageTitle from "../../components/PageTitle";

const EmployeurDes = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["empDes"],
    queryFn: async () =>
      await makeRequest.get(`/emp/empDes`).then((res) => {
        return res.data;
      }),
    onError: () => {
      <Navigate to="/login" replace />;
    },
  });

  const [filterText, setFilterText] = useState(""); // State variable for filtering
  const [filterType, setFilterType] = useState("immatricule");
  // Filtering logic based on filterText
  const filteredData = data?.filter((des) =>
    des[filterType].toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto flex gap-1 flex-col shadow-md sm:rounded-lg ">
      <PageTitle title="Désignation Des Employeurs" icon={BsLink45Deg} />

      <div className="flex gap-3 justify-end py-2 px-4">
        <div className="flex items-center gap-2">
          <label className="text-sm" htmlFor="filter">
            Type De Filtre
          </label>
          <select
            id="filter"
            className="w-auto  py-2 px-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Désignation
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((empDes) => {
            return (
              <tr
                key={empDes.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{empDes.immatricule}</td>
                <td className="px-6 py-4">{empDes.prenom}</td>
                <td className="px-6 py-4">{empDes.nom}</td>
                <td className="px-6 py-4">{empDes.nomDes}</td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    href={`#/:${empDes.immatricule}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <BsPencilSquare className="text-2xl" />
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

export default EmployeurDes;
