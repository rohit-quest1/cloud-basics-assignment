import { TextInput } from "@tremor/react";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(email, username, password);
      const response = await axios.post(`${apiUrl}/api/users`, {
        email,
        username,
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
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred. Please try again.");
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
            Create an account
          </h3>
          <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
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
                htmlFor="username"
                className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium"
              >
                Username
              </label>
              <TextInput
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Choose a username"
                className="mt-2"
                value={username}
                required={true}
                onChange={(e) => setUsername(e.target.value)}
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
                autoComplete="new-password"
                placeholder="Create a password"
                className="mt-2"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="hover:bg-[#F8AD6A] bg-[#F2360A]  rounded-tremor-default text-tremor-default text-tremor-brand-inverted shadow-tremor-input dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis mt-4 w-full whitespace-nowrap py-2 text-center font-medium"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:text-[#F8AD6A] text-[#F2360A] dark:text-dark-tremor-brand dark:hover:text-dark-tremor-brand-emphasis font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
