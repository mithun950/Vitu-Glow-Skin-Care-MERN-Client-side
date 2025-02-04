import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  console.log(email,password)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-[#001a00] bg-opacity-50">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src="https://ncetir.com/Images/login@4x.png"
          alt="Login"
          className="w-3/4 lg:w-full max-w-md"
        />
      </div>

      {/* Form Section */}
      <div className="w-8/12 mt-8 lg:w-1/3 bg-white/10 bg-opacity-20 backdrop-blur-xl p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          Login Now!
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent border border-white text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border border-white text-white placeholder-gray-300 px-4 py-2 rounded-lg focus:outline-none w-full"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <a
            href="/forgot-password"
            className="text-gray-300 text-sm text-right"
          >
            Forgot Password?
          </a>
          <button
            type="submit"
            className="bg-white text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-2 text-gray-300">OR</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="border border-gray-300 font-semibold text-white py-2 rounded-lg flex items-center justify-center w-full hover:bg-gray-300 hover:text-gray-900 transition"
        >
          <FcGoogle className="mr-2 text-xl "></FcGoogle> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
