import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const AuthLayout = ({ children, type }) => {
	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-white">
			<div className="w-full max-w-6xl flex rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-lg bg-white/5 border border-white/10">
				<div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold bg-clip-text text-transparent mb-4 text-black">
							{type === 'login' ? 'Welcome Back' : 'Get Started'}
						</h1>
						<p className="text-black text-lg">
							{type === 'login'
								? 'Sign in to your account'
								: 'Create your free account'}
						</p>
					</div>
					{children}
				</div>

				{/* Graphic Section */}
				<div className="hidden md:block w-1/2 relative">
					<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
						<img
							src="/login_reg.svg"
							alt="Auth Illustration"
							className="w-64 h-64 mb-8 animate-float"
						/>
						<h2 className="text-3xl font-bold text-white mb-4">
							{type === 'login' ? 'New Here?' : 'Already Member?'}
						</h2>
						<p className="text-black mb-6 px-8">
							{type === 'login'
								? 'Join our community and start your journey today!'
								: 'Sign in to continue your learning experience'}
						</p>
						<Link
							to={type === 'login' ? '/register' : '/login'}
							className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 group"
						>
							<span className="text-black">
								{type === 'login' ? 'Create Account' : 'Sign In Now'}
							</span>
							<FiArrowRight className="text-green-400 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;