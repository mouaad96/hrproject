import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Departement from "./pages/Departement";
import Authentication from "./pages/Authentication";
import Employeur from "./pages/Employeur";
import Settings from "./pages/Settings";
import Feries from "./pages/Feries";
import Bureau from "./pages/Bureau";
import Presence from "./pages/Presence";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjouterEmp from "./pages/employeur/AjouterEmp";
import EmployeurDes from "./pages/employeur/EmployeurDes";
import UpdateEmp from "./pages/employeur/UpdateEmp";

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
          path="/Employeurs/:menu"
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
          path="/Départements/:aID"
          element={
            <RootLayout>
              <Departement />
            </RootLayout>
          }
        />
        <Route
          path="/Bureaux/:brID"
          element={
            <RootLayout>
              <Bureau />
            </RootLayout>
          }
        />
        <Route path="/Login" element={<Auth />} />
        <Route path="/AjouterEmp" element={<AjouterEmp />} />
        <Route path="UpdateEmp/:empId" element={<UpdateEmp />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
