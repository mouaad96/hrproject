import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AllApps from "./pages/AllApps";
import Departement from "./pages/Departement";
import Authentication from "./pages/Authentication";
import Employeur from "./pages/Employeur";
import Settings from "./pages/Settings";
import Stroage from "./pages/Stroage";
import Bureau from "./pages/Bureau";

const App = () => {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<AllApps />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/stroage" element={<Stroage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Employeurs/:bID" element={<Employeur />} />
        <Route path="/Départements/:aID" element={<Departement />} />
        <Route path="/Bureaux/:brID" element={<Bureau />} />
      </Routes>
    </RootLayout>
  );
};

export default App;
