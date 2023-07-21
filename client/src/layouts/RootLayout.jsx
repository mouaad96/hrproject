import { Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function RootLayout({ children }) {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
