import 'regenerator-runtime/runtime';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from "../../Providers/AuthProvider";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const uploadSectionRef = useRef(null);
  
  // Custom slow scroll function
  const slowScrollToRef = (ref, duration = 2000) => {
    if (!ref.current) {
            console.error("Upload section ref is null");
            return;
          }

  const targetPosition = ref.current.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  
  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Cap at 1
    const easeProgress = easeInOutQuad(progress);

    window.scrollTo(0, startPosition + distance * easeProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const handleScrollToUpload = () => {
  slowScrollToRef(uploadSectionRef, 2000); // 2000ms = 2 seconds
};

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
                Smart Pension Management <span className="text-black">Made Simple</span>
              </h1>
              <p className="text-xl text-black mb-8">
                Instant analysis, automated processing, and clear retirement planning
              </p>
              <button className="bg-teal-400 hover:bg-teal-300 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:text-blue"
                onClick={handleScrollToUpload}>
                Get Started
              </button>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <img
                src="/pensionLogo.jpg"
                alt="Pension illustration"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-gray-50"
        ref={uploadSectionRef}>
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Fill out your pension application today</h2>
            <p className="text-gray-600 text-lg">Complete a short form & get your pension processed instantly</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-solid border-gray-300 hover:border-teal-400 transition-colors">
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                {user ? "Click below to start your pension application" : "Sign in to start your pension application"}
              </p>
              <Link
                to={user ? "/pension-form" : "/login"}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors"
              >
                {user ? "Start Application" : "Sign In"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                data-aos="zoom-in"
                className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center text-white mb-6">
                  <span className="text-2xl font-bold">{item}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Step {item}</h3>
                <p className="text-gray-600">
                  {item === 1 && "Upload your pension documents securely through our encrypted portal"}
                  {item === 2 && "Our AI analyzes your documents and verifies service history"}
                  {item === 3 && "Receive instant calculation and downloadable report"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Simplify Your Pension?</h2>
          <p className="text-xl text-teal-100 mb-12 max-w-2xl mx-auto">
            Join thousands who've already taken control of their retirement planning
          </p>
          <button className="bg-white text-teal-600 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105">
            Start Free Analysis
          </button>
        </div>
      </section>
    </div>
  );
}
