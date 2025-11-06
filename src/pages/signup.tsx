import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface SignupProps {
  setIsAuthenticated: (value: boolean) => void;
}

export const Signup: React.FC<SignupProps> = ({ setIsAuthenticated }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const res = await fetch(`${BACKEND_URL}api/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Signup failed");
      alert("Signup successful! Logging you in...");

      // Auto-sign in after signup
      const loginRes = await fetch(`${BACKEND_URL}api/v1/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) throw new Error("Auto-login failed");

      localStorage.setItem("token", loginData.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch {
      alert("Error creating account!");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-md w-80 sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          className="border border-gray-300 w-full p-3 mb-4 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="border border-gray-300 w-full p-3 mb-5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};
