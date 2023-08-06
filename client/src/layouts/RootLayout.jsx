import { Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import TopBar from "./header/TopBar";

function RootLayout({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <div>
      <div className="flex ">
        <Sidebar />
        <div className=" flex-1 ">
          <TopBar data={currentUser} />
          <main className="max-w-6xl   mx-auto">{children}</main>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
