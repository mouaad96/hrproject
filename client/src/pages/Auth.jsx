import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Auth = () => {
  const [inputs, setInputs] = useState({
    nomCpt: "",
    mdp: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login, currentUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
    toast.error(err);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-3 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="uppercase flex items-center justify-center font-bold">
          <span className="text-blue-600 text-5xl font-bold">C</span>
          <span className="text-white">ommune</span>
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom D'utilisateur
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="nomCpt"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="employeur111"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mot De Passe
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="mdp"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Se Connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
