import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
  const { signUpWithEmail, googleSignIn } = useAuth();
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      navigate('/');
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignIn();
      navigate('/');
    } catch (error) {
      console.error('Google sign-up failed:', error);
    }
  };

  return (
    <div className=" flex flex-col lg:flex-row items-center justify-center  min-h-screen bg-[#001a00] p-6">
      <div className="w-8/12">
        <img src="https://d1idiaqkpcnv43.cloudfront.net/website1.0/images/sign-up.png" alt="Sign Up" className="lg:w-[700px]  mb-6 " />
      </div>
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-transparent border border-white text-white placeholder-gray-300 rounded-lg focus:outline-none"
              required
            />
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="w-full bg-white text-[#001a00] font-bold p-3 rounded-lg  cursor-pointer transition">Sign Up</button>
        </form>
        <div className="my-4 flex items-center text-gray-300">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="px-3">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <button
          onClick={handleGoogleSignUp}
          className="w-full cursor-pointer flex font-bold items-center justify-center gap-2 border border-gray-400 text-white p-3 rounded-lg hover:bg-gray-800 transition"
        >
          <FcGoogle className="text-xl" /> Sign Up with Google
        </button>
        <p className="text-gray-300 text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp
