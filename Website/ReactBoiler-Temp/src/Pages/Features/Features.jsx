import { Check, Zap, Shield, BarChart, Layers, Compass } from "lucide-react"
import {
    Link,
  } from "@nextui-org/react"

export default function FeaturesPage() {

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Blazing Fast Pension Processing
          </h1>
          <p className="mt-6 text-xl text-gray-500">
          Our Platform Empowers You to Build, Launch, and Grow Your Pension Processing with Confidence
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-[#155c45]" />}
            title="Lightning Fast"
            description="Streamline your pension processing with our blazing fast, optimized infrastructure and cutting-edge technology stack."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-[#155c45]" />}
            title="Secure Pension Processing"
            description="Rest easy knowing your pension data is protected with bank-level security and compliance measures."
          />
          <FeatureCard
            icon={<BarChart className="h-6 w-6 text-[#155c45]" />}
            title="Advanced Pension Analytics"
            description="Gain valuable insights with comprehensive analytics and reporting tools to track your pension processing progress."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6 text-[#155c45]" />}
            title="Scalable Architecture"
            description="Our platform grows with your needs, handling increased pension processing demands and data without missing a beat."
          />
          <FeatureCard
            icon={<Compass className="h-6 w-6 text-[#155c45]" />}
            title="Intuitive Navigation"
            description="Enjoy a seamless user experience with our thoughtfully designed interface and navigation system."
          />
          <FeatureCard
            icon={<Check className="h-6 w-6 text-[#155c45]" />}
            title="Reliable Support"
            description="Get help when you need it with our dedicated support team and comprehensive documentation."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">{icon}</div>
      <h2 className="font-bold text-xl mb-3 text-gray-900">{title}</h2>
      <p className="text-gray-500 flex-grow">{description}</p>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link href="#" className="text-[#155c45] font-medium text-sm inline-flex items-center hover:text-indigo-500">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

