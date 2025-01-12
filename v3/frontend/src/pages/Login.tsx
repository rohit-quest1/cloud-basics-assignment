import { TextInput } from "@tremor/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password,
      });

      // Store token and user data in Redux store
      dispatch({
        type: "auth/setCredentials",
        payload: {
          user: response.data.user,
          token: response.data.token,
        },
      });

      toast.success("Logged in successfully!");
      console.log(response.data.user.role);
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster closeButton expand={false} richColors position="top-center" />
      <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong text-center font-semibold">
            Log in to your account
          </h3>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"
              >
                Email
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Your Email Address"
                className="mt-2"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"
              >
                Password
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="mt-2"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="hover:bg-[#F8AD6A] bg-[#F2360A]  rounded-tremor-default  text-tremor-default text-tremor-brand-inverted shadow-tremor-input dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis mt-4 w-full whitespace-nowrap py-2 text-center font-medium"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-4 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="hover:text-[#F8AD6A] text-[#F2360A] dark:text-dark-tremor-brand dark:hover:text-dark-tremor-brand-emphasis font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}