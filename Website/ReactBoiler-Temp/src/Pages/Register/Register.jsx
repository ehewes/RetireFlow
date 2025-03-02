import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import AuthLayout from '../Home/Components/AuthLayout';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Basic password validations
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\/-]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    try {
      // 1. Create the user
      const result = await createUser(email, password);
      toast.success("Account created successfully!");

      // 2. Update profile
      await updateProfile(result.user, { displayName: name ? name : email.split('@')[0] });

      // 4. Navigate to home
      setTimeout(() => {
        navigate("/");
      }, 1600);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


  return (
    <AuthLayout type="signup">
      <ToastContainer />
      <form onSubmit={handleRegister} className="space-y-6">
        {/* Name Input */}
        <div className="group relative">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-black border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 text-black placeholder-gray-400 transition-all duration-300"
            required
          />
        </div>

        {/* Email Input */}
        <div className="group relative">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-black border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 text-black placeholder-gray-400 transition-all duration-300"
            required
          />
        </div>

        {/* Password Input */}
        <div className="group relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-sm rounded-xl border-2 border-black border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 text-black placeholder-gray-400 transition-all duration-300"
            required
          />
        </div>

        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            className="rounded bg-white/5 border-white/10"
            required
          />
          <span className="text-sm">
            I agree to the <a href="#" className="text-black hover:underline">Terms of Service</a>
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-cyan-300 hover:to-blue-400 text-white py-4 rounded-xl font-semibold tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20"
        >
          Create Account
        </button>
      </form>
    </AuthLayout>
  );
};


export default Register;
