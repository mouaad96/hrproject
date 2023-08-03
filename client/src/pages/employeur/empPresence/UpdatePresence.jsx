import React, { useState } from "react";
import Input from "../../../components/Input";
import { NavLink, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import { toast } from "react-toastify";
import DropDown from "../../../components/DropDown";
import moment from "moment";

const UpdatePresence = () => {
  const { presId } = useParams();
  const [inputs, setInputs] = useState({
    dateArr: "",
    datePart: "",
    immatricule: "",
  });

  const getPresence = useQuery(["onePres", presId], async () => {
    const response = await makeRequest.get(`/presence/onePres/${presId}`);

    const { dateArr, datePart, immatricule } = response.data;
    const formatedDateArr = moment(dateArr).format("HH:mm");
    const formatedDatePart = moment(datePart).format("HH:mm");
    setInputs((prevInputs) => ({
      ...prevInputs,
      dateArr: formatedDateArr,
      datePart: formatedDatePart,
      immatricule,
    }));
    return response.data;
  });

  const updatePresence = async (des) => {
    try {
      await makeRequest.put(`/presence/update/${presId}`, des);
    } catch (err) {
      throw err;
    }
  };

  const updatePresenceMutation = useMutation(updatePresence);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(inputs);
    updatePresenceMutation
      .mutateAsync(inputs)
      .then(() => {
        toast.info("Presence Mis A Jour!");
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  const getAllEmps = useQuery({
    queryKey: ["allEms"],
    queryFn: async () =>
      await makeRequest.get(`/emp/list`).then((res) => {
        return res.data;
      }),
  });
  const immatricules = getAllEmps.data;

  return (
    <div className=" h-screen  bg-gray-900 flex flex-col align-middle p-5 gap-2">
      <h1 className="text-white">Mettre A jour Une Désignation</h1>
      <NavLink
        to={"/Employeurs/Présence"}
        className=" self-start text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Retourner
      </NavLink>
      <form className="flex flex-col justify-center align-middle py-10">
        <div className="mb-8">
          <Input
            type="time"
            id="dateArr"
            name="dateArr"
            value={inputs.dateArr}
            label="Date Arrivé"
            handleChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <Input
            type="time"
            id="datePart"
            name="datePart"
            value={inputs.datePart}
            label="Date Sorti"
            handleChange={handleChange}
          />
        </div>

        <div className="mb-8">
          <DropDown
            handleChange={handleChange}
            name="immatricule"
            id="immatricule"
            defaultVal={inputs.immatricule}
            keyProp="immatricule"
            data={immatricules}
            value="immatricule"
            option="immatricule"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="text-white self-center  px-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default UpdatePresence;
