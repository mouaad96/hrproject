import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Departement from "./pages/departement/Departement";
import Authentication from "./pages/Authentication";
import Employeur from "./pages/Employeur";
import Settings from "./pages/Settings";
import Feries from "./pages/Feries";
import Bureau from "./pages/bureau/Bureau";
import Presence from "./pages/Presence";
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
          path="/Employeurs/Présence"
          element={
            <RootLayout>
              <Presence />
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

        <Route path="/Login" element={<Auth />} />
        <Route path="/AjouterEmp" element={<AjouterEmp />} />
        <Route path="/AjouterDep" element={<AjouterDep />} />
        <Route path="/AjouterBur" element={<AjouterBur />} />
        <Route path="/AjouterSubDep" element={<AjouterSousDep />} />
        <Route path="/UpdateEmp/:empId" element={<UpdateEmp />} />
        <Route path="/UpdateDep/:depId" element={<UpdateDep />} />
        <Route path="/UpdateSubDep/:sdId" element={<UpdateSousDep />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
