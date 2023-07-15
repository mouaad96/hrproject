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
import Login from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RootLayout>
            <AllApps />
          </RootLayout>
        }
      />
      <Route path="/Login" element={<Login />} />
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
        path="/Employeurs/:bID"
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
    </Routes>
  );
};

export default App;
