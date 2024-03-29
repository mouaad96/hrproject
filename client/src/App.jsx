import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Departement from "./pages/departement/Departement";
import Employeur from "./pages/Employeur";
import Bureau from "./pages/bureau/Bureau";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjouterEmp from "./pages/employeur/AjouterEmp";
import EmployeurDes from "./pages/employeur/EmployeurDes";
import UpdateEmp from "./pages/employeur/UpdateEmp";
import AjouterDep from "./pages/departement/AjouterDep";
import SousDep from "./pages/sousDep/SousDep";
import UpdateDep from "./pages/departement/UpdateDep";
import AjouterSousDep from "./pages/sousDep/AjouterSousDep";
import UpdateSousDep from "./pages/sousDep/UpdateSousDep";
import AjouterBur from "./pages/bureau/AjouterBur";
import Affectation from "./pages/employeur/Affectation";
import UpdateBur from "./pages/bureau/UpdateBur";
import Designation from "./pages/designation/Designation";
import AjouterDes from "./pages/designation/AjouterDes";
import UpdateDes from "./pages/designation/UpdateDes";
import EmployeurGrade from "./pages/employeur/EmployeurGrade";
import Conge from "./pages/employeur/empConge/Conge";
import AjouterConge from "./pages/employeur/empConge/AjouterConge";
import UpdateEmpBur from "./pages/employeur/UpdateEmpBur";
import UpdateEmpDes from "./pages/employeur/UpdateEmpDes";
import UpdateEmpGrade from "./pages/employeur/UpdateEmpGrade";
import Compte from "./pages/Compte";
import Ferie from "./pages/ferie/Ferie";
import AjouterFerie from "./pages/ferie/AjouterFerie";
import UpdateFerie from "./pages/ferie/UpdateFerie";
import Demande from "./pages/demande/Demande";
import AjouterDemande from "./pages/demande/AjouterDemande";
import SingleDemande from "./pages/demande/SingleDemande";
import Famille from "./pages/famille/Famille";
import AjouterFamille from "./pages/famille/AjouterFamille";
import UpdateFamille from "./pages/famille/UpdateFamille";
import SingleEmp from "./pages/employeur/SingleEmp";
import Salaire from "./pages/employeur/empSalaire/Salaire";
import AjouterSalaire from "./pages/employeur/empSalaire/AjouterSalaire";
import EmpSal from "./pages/employeur/empSalaire/EmpSal";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CurrentEmpSal from "./pages/employeur/empSalaire/CurrentEmpSal";
import Home from "./pages/Home";
import EmpDemandes from "./pages/demande/EmpDemandes";
import UpdateSalaire from "./pages/employeur/empSalaire/UpdateSalaire";
import EmpConge from "./pages/employeur/empConge/EmpConge";
import EmpHome from "./pages/employeur/EmpHome";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              {currentUser ? (
                currentUser.isAdmin ? (
                  <Home />
                ) : (
                  <EmpHome />
                )
              ) : (
                <p>Please log in to view content.</p>
              )}
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Liste Des Employeurs"
          element={
            <RootLayout>
              <Employeur />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Désignation"
          element={
            <RootLayout>
              <EmployeurDes />
            </RootLayout>
          }
        />

        <Route
          path="/Départements/Sous Département"
          element={
            <RootLayout>
              <SousDep />
            </RootLayout>
          }
        />
        <Route
          path="/Départements/Liste"
          element={
            <RootLayout>
              <Departement />
            </RootLayout>
          }
        />

        <Route
          path="/Bureaux"
          element={
            <RootLayout>
              <Bureau />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Bureau Occupé"
          element={
            <RootLayout>
              <Affectation />
            </RootLayout>
          }
        />

        <Route
          path="/Désignation"
          element={
            <RootLayout>
              <Designation />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Grade"
          element={
            <RootLayout>
              <EmployeurGrade />
            </RootLayout>
          }
        />

        <Route
          path="/Feries"
          element={
            <RootLayout>
              <Ferie />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Congés"
          element={
            <RootLayout>
              <Conge />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Famille"
          element={
            <RootLayout>
              <Famille />
            </RootLayout>
          }
        />

        <Route
          path="/Employeurs/Paiements"
          element={
            <RootLayout>
              {currentUser ? (
                currentUser.isAdmin ? (
                  <Salaire />
                ) : (
                  <CurrentEmpSal />
                )
              ) : (
                <p>Please log in to view content.</p>
              )}
            </RootLayout>
          }
        />

        <Route
          path="/Demandes"
          element={
            <RootLayout>
              {currentUser ? (
                currentUser.isAdmin ? (
                  <Demande />
                ) : (
                  <EmpDemandes />
                )
              ) : (
                <p>Please log in to view content.</p>
              )}
            </RootLayout>
          }
        />

        <Route path="/Compte" element={<Compte />} />
        <Route path="/AjouterFer" element={<AjouterFerie />} />
        <Route path="/AjouterSalaire" element={<AjouterSalaire />} />
        <Route path="/UpdateFer/:ferId" element={<UpdateFerie />} />
        <Route path="/Demande/:demId" element={<SingleDemande />} />
        <Route path="/Login" element={<Auth />} />
        <Route path="/AjouterEmp" element={<AjouterEmp />} />
        <Route path="/SingleEmp/:eId" element={<SingleEmp />} />
        <Route path="/EmpConge/:congId" element={<EmpConge />} />
        <Route path="/singleSal/:im" element={<EmpSal />} />
        <Route path="/AjouterFam" element={<AjouterFamille />} />
        <Route path="/AjouterDem" element={<AjouterDemande />} />
        <Route path="/AjouterDep" element={<AjouterDep />} />
        <Route path="/AjouterBur" element={<AjouterBur />} />
        <Route path="/AjouterDes" element={<AjouterDes />} />
        <Route path="/AjouterSubDep" element={<AjouterSousDep />} />
        <Route path="/AjouterConge" element={<AjouterConge />} />

        <Route path="/UpdateEmp/:empId" element={<UpdateEmp />} />
        <Route path="/UpdateDep/:depId" element={<UpdateDep />} />
        <Route path="/UpdateDes/:desId" element={<UpdateDes />} />
        <Route path="/UpdateBur/:idBur" element={<UpdateBur />} />
        <Route path="UpdateSalaire/:salId" element={<UpdateSalaire />} />

        <Route path="/UpdateSubDep/:sdId" element={<UpdateSousDep />} />
        <Route path="/UpdateEmpBur/:ima" element={<UpdateEmpBur />} />
        <Route path="/UpdateEmpDes/:ima" element={<UpdateEmpDes />} />
        <Route path="/UpdateEmpGrade/:ima" element={<UpdateEmpGrade />} />
        <Route path="/UpdateFam/:famId" element={<UpdateFamille />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
