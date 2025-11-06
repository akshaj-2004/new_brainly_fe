import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface SigninProps {
  setIsAuthenticated: (value: boolean) => void;
}

export const Signin: React.FC<SigninProps> = ({ setIsAuthenticated }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const res = await fetch(`${BACKEND_URL}api/v1/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signin failed");

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch {
      alert("Invalid username or password");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignin}
        className="bg-white p-8 rounded-2xl shadow-md w-80 sm:w-96"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Welcome Back
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
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/dashboard")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};
