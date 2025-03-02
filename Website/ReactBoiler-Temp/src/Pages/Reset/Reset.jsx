import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { sendPasswordResetEmail } from 'firebase/auth';
import { database } from '../../firebase/firebase.config'; // Firebase auth reference

const Reset = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    try {
      await sendPasswordResetEmail(database, email);
      alert("Check your email");
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden bg-white">
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="RZA Reset Password" />
      </Helmet>

      <div className="w-full max-w-md rounded-lg p-8">
        <div className="text-center mb-6 text-black text-3xl font-semibold">
          Reset Password
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <input
            name="email"
            type="email"
            className="w-full border-2 px-4 py-3 border-black  text-white rounded-2xl placeholder-gray-400 !!focus:outline-none focus:border-white"
            placeholder="Enter Email"
            required
          />
          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-cyan-300 hover:to-blue-400 text-white py-4 rounded-xl font-semibold tracking-wide transition-all duration-300 transform shadow-lg hover:shadow-cyan-500/20"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset;
