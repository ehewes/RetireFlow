import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

export default function Profile() {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  }, []);

  const { user } = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!user.email) {
          throw new Error('User email is missing');
        }
        const response = await axios.get(`http://localhost:3051/api/get_applications?email=${user.email}`);
        setReports(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load your applications. Please try again later.');
        setLoading(false);
      }
    };

    if (user) {
      fetchReports();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (applicationId) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`http://localhost:3051/api/delete_application/${applicationId}?email=${user.email}`);
        setReports(reports.filter((report) => report._id !== applicationId));
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Failed to delete application");
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <Link to="/login" className="text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-20 text-white">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              Welcome, {user.name || 'User'}
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Manage your pension applications and retirement planning here.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-lg p-8 border-2 border-solid border-gray-300 hover:border-teal-400 transition-colors">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600"><strong>Name:</strong> {user.displayName || 'N/A'}</p>
                <p className="text-gray-600"><strong>Email:</strong> {user.email || 'N/A'}</p>
              </div>
              <div>
                <Link to="/pension-form" className="bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors inline-block">
                  Start New Application
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Your Applications
          </h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading your applications...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-600">
              No applications found.{' '}
              <Link to="/pension-form" className="text-teal-500 hover:underline">
                Start one now!
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reports.map((report) => (
                <div key={report._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 hover:border-teal-400" data-aos="zoom-in">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {`Application #${report._id}`}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {report.submissionDate ? new Date(report.submissionDate).toLocaleDateString() : 'Date N/A'}
                  </p>
                  <div className="flex justify-between items-center">
                    <Link to={`/reports/${report._id}`} className="text-teal-500 hover:underline font-medium">
                      View Details
                    </Link>
                    <button onClick={() => handleDelete(report._id)} className="text-red-500 hover:text-red-700" title="Delete Application">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}