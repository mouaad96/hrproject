import { Navigate } from "react-router-dom";
import Sidebar from "./sidebar";

function RootLayout({ children }) {
  const isAuthenticated = true;
  return isAuthenticated ? (
    <div className="flex gap-5">
      <Sidebar />
      <main className="max-w-5xl flex-1 mx-auto py-4">{children}</main>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RootLayout;
