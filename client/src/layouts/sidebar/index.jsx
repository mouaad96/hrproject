import { useEffect, useState } from "react";
import { useRef, useContext } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineUser,
  AiOutlineDesktop,
} from "react-icons/ai";
import { BsFillBuildingsFill, BsFillCalendarCheckFill } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useMediaQuery } from "react-responsive";
import { MdMenu, MdPeople, MdLogout, MdOutlineTaskAlt } from "react-icons/md";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout", { withCredentials: true })
      .then((resp) => toast.info(resp.data));
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    currentUser.isAdmin
      ? {
          name: "Employeurs",
          icon: MdPeople,
          menus: [
            "Liste Des Employeurs",
            "Famille",
            "Désignation",
            "Bureau Occupé",
            "Grade",
            "Congés",
            "Paiements",
          ],
        }
      : null,
    {
      name: "Départements",
      icon: BsFillBuildingsFill,
      menus: ["Liste", "Sous Département"],
    },
  ].filter((item) => item !== null);

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-full "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <h1 className="uppercase flex items-center justify-center font-bold">
            <span className="text-blue-600 text-5xl font-bold">C</span>
            <span>ommune</span>
          </h1>
        </div>

        <div className="flex flex-col  min-h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[85%] h-[85%]">
            <li>
              <NavLink to={"/"} className="link">
                <AiFillHome size={23} className="min-w-max" />
                Accueil
              </NavLink>
            </li>

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Ressources
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
                <li>
                  <NavLink to={"/Bureaux"} className="link">
                    <AiOutlineDesktop size={23} className="min-w-max" />
                    Bureau
                  </NavLink>
                  <NavLink to={"/Désignation"} className="link">
                    <MdOutlineTaskAlt size={23} className="min-w-max" />
                    Désignations
                  </NavLink>
                </li>
              </div>
            )}
            <li>
              <NavLink to={"/Demandes"} className="link">
                <AiFillMessage size={23} className="min-w-max" />
                Demandes
              </NavLink>
            </li>
            <li>
              <NavLink to={"/Feries"} className="link">
                <BsFillCalendarCheckFill size={23} className="min-w-max" />
                Jours Feries
              </NavLink>
            </li>

            {currentUser.isAdmin ? (
              ""
            ) : (
              <li>
                <NavLink to={"/Employeurs/Paiements"} className="link">
                  <FaMoneyCheckAlt size={23} className="min-w-max" />
                  Paiement
                </NavLink>
              </li>
            )}
            <li className="border-t pt-5 border-slate-300 ">
              <NavLink to={"/Compte"} className="link">
                <AiOutlineUser size={23} className="min-w-max" />
                Compte
              </NavLink>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="link">
                <MdLogout size={23} className="min-w-max" />
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
