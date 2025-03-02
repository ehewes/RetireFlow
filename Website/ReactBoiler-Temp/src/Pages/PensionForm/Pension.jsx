import React, { useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../Providers/AuthProvider"; // Adjust path if needed

const PensionForm = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    niNumber: '',
    yearsOfService: '',
    currentSalary: '',
    annuityType: 'Full Annuity',
    survivorBenefit: 'No',
    healthcare: 'Yes',
    retirementDate: '',
    termsAgreed: false,
  });

  useEffect(() => {
    if (user) {
      console.log('User:', user);
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3051/api/post_application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      alert('Application submitted successfully!');

      // Optional: Reset form after successful submission
      setFormData({
        fullName: user?.displayName || '',
        email: user?.email || '',
        dob: '',
        niNumber: '',
        yearsOfService: '',
        currentSalary: '',
        annuityType: 'Full Annuity',
        survivorBenefit: 'No',
        healthcare: 'Yes',
        retirementDate: '',
        termsAgreed: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4" data-aos="fade-up">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-2 border-solid border-gray-300 hover:border-teal-400 transition-colors">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Pension Application Form
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Complete the fields below to process your pension application instantly
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-gray-700 mb-2 font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="niNumber" className="block text-gray-700 mb-2 font-medium">
                    National Insurance Number
                  </label>
                  <input
                    type="text"
                    id="niNumber"
                    name="niNumber"
                    value={formData.niNumber}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Employment Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="yearsOfService" className="block text-gray-700 mb-2 font-medium">
                    Years of Service
                  </label>
                  <input
                    type="number"
                    id="yearsOfService"
                    name="yearsOfService"
                    value={formData.yearsOfService}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <label htmlFor="currentSalary" className="block text-gray-700 mb-2 font-medium">
                    Current Annual Salary (£)
                  </label>
                  <input
                    type="number"
                    id="currentSalary"
                    name="currentSalary"
                    value={formData.currentSalary}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                    min="0"
                    step="1"
                  />
                </div>
              </div>
            </div>

            {/* Pension Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Pension Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="annuityType" className="block text-gray-700 mb-2 font-medium">
                    Annuity Type
                  </label>
                  <select
                    id="annuityType"
                    name="annuityType"
                    value={formData.annuityType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="Full Annuity">Full Annuity</option>
                    <option value="Partial Annuity">Partial Annuity</option>
                    <option value="Lump Sum">Lump Sum</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="survivorBenefit" className="block text-gray-700 mb-2 font-medium">
                    Survivor Benefit
                  </label>
                  <select
                    id="survivorBenefit"
                    name="survivorBenefit"
                    value={formData.survivorBenefit}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="healthcare" className="block text-gray-700 mb-2 font-medium">
                    Healthcare Coverage
                  </label>
                  <select
                    id="healthcare"
                    name="healthcare"
                    value={formData.healthcare}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="retirementDate" className="block text-gray-700 mb-2 font-medium">
                    Planned Retirement Date
                  </label>
                  <input
                    type="date"
                    id="retirementDate"
                    name="retirementDate"
                    value={formData.retirementDate}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="h-5 w-5 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="termsAgreed" className="text-gray-700 font-medium">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </form>

          <div className="text-center mt-8">
            <Link to="/" className="text-teal-600 hover:underline font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PensionForm;