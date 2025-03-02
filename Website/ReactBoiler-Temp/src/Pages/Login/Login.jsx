import { useContext } from "react";
import { AuthContext } from '../../Providers/AuthProvider';
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FiMail, FiLock } from "react-icons/fi";
import AuthLayout from "../Home/Components/AuthLayout";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await signInUser(email, password);
            await updateProfile(result.user, { displayName: name ? name : email.split('@')[0] });

            toast.success("Login Successful!", {
                position: "bottom-right",
                autoClose: 1500,
            });
            setTimeout(() => navigate("/"), 1600);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            navigate("/login");
        }
    };

    return <AuthLayout type="login">
        <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="group relative">
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3.5 border-black bg-white/5 backdrop-blur-sm rounded-xl border-2 border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 text-black transition-all duration-300"
                    required
                />
            </div>

            {/* Password Input */}
            <div className="group relative">                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full pl-12 pr-4 py-3.5 border-black bg-white/5 backdrop-blur-sm rounded-xl border-2 border-white/10 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 text-black transition-all duration-300"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="rounded bg-white/5 border-white/10" />
                    <span className="text-sm text-black">Remember me</span>
                </label>
                <Link to="/reset" className="text-cyan-400 hover:text-cyan-300 text-sm">
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-cyan-300 hover:to-blue-400 text-white py-4 rounded-xl font-semibold tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20"
            >
                Sign In
            </button>
        </form>

        <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
            </div>
        </div>
    </AuthLayout>
};

export default Login;
