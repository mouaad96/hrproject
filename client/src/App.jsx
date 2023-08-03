import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Departement from "./pages/departement/Departement";
import Authentication from "./pages/Authentication";
import Employeur from "./pages/Employeur";
import Settings from "./pages/Settings";
import Feries from "./pages/Feries";
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
import Presence from "./pages/employeur/empPresence/Presence";
import AjouterPresence from "./pages/employeur/empPresence/AjouterPresence";
import Conge from "./pages/employeur/empConge/Conge";
import AjouterConge from "./pages/employeur/empConge/AjouterConge";
import UpdatePresence from "./pages/employeur/empPresence/UpdatePresence";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <AllApps />
            </RootLayout>
          }
        />

        <Route
          path="/authentication"
          element={
            <RootLayout>
              <Authentication />
            </RootLayout>
          }
        />
        <Route
          path="/Feries"
          element={
            <RootLayout>
              <Feries />
            </RootLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <RootLayout>
              <Settings />
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
          path="/Bureaux/Liste Des Bureaux"
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
          path="/Désignations/Liste Des Désignations"
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
          path="/Employeurs/Présence"
          element={
            <RootLayout>
              <Presence />
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

        <Route path="/Login" element={<Auth />} />
        <Route path="/AjouterEmp" element={<AjouterEmp />} />
        <Route path="/AjouterDep" element={<AjouterDep />} />
        <Route path="/AjouterBur" element={<AjouterBur />} />
        <Route path="/AjouterDes" element={<AjouterDes />} />
        <Route path="/AjouterPresence" element={<AjouterPresence />} />
        <Route path="/AjouterSubDep" element={<AjouterSousDep />} />
        <Route path="/AjouterConge" element={<AjouterConge />} />
        <Route path="/UpdateEmp/:empId" element={<UpdateEmp />} />
        <Route path="/UpdateDep/:depId" element={<UpdateDep />} />
        <Route path="/UpdateDes/:desId" element={<UpdateDes />} />
        <Route path="/UpdateBur/:idBur" element={<UpdateBur />} />
        <Route path="/UpdatePresence/:presId" element={<UpdatePresence />} />
        <Route path="/UpdateSubDep/:sdId" element={<UpdateSousDep />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
