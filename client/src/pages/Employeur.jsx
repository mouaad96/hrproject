import React, { useEffect, useState } from "react";
import axios from "axios";

const Employeur = () => {
  const url = "http://localhost:5000/api/emp/";
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    const resp = await axios.get(`${url}list`);
    setEmployees(resp.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
              tel
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            return (
              <tr
                key={employee.immatricule}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{employee.immatricule}</td>
                <td className="px-6 py-4">{employee.prenom}</td>
                <td className="px-6 py-4">{employee.nom}</td>
                <td className="px-6 py-4">{employee.tel}</td>
                <td className="px-6 py-4">
                  <a
                    href={`#/:${employee.immatricule}`}
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

export default Employeur;
