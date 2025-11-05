import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Landing } from "./pages/landing";
import { Signin } from "./pages/sigin";
import { Signup } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const onStorageChange = () =>
      setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Landing />
            )
          }
        />

        {/* Auth Pages */}
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signin setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Signup setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* Protected Dashboard */}
       <Route
  path="/dashboard"
  element={
    isAuthenticated ? (
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
    ) : (
      <Navigate to="/landing" replace />
    )
  }
/>


        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
