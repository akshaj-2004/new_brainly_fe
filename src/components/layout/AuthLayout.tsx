import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full py-4 px-8 border-b bg-white flex items-center justify-between shadow-sm">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-indigo-600 cursor-pointer hover:opacity-80 transition"
        >
          Second Brain
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} Second Brain. All rights reserved.
      </footer>
    </div>
  );
};
