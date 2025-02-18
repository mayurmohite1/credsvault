import { FileLock2, Lock, Key } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 border border-gray-700/50">
    <div className="h-12 w-12 text-emerald-400 mb-4 transform transition-transform duration-500 hover:rotate-12">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text ">
      {title}
    </h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/store");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <nav className="relative flex items-center justify-between p-6 backdrop-blur-sm bg-gray-900/50">
        <div className="flex items-center space-x-2">
          <FileLock2 className="h-9 w-9 text-emerald-400 " />
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            CredsVault
          </span>
        </div>
        <div className="flex space-x-6">
          {/* @ts-expect-error msg */}
          <appkit-button />
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Securely Store Your Credentials on the Blockchain
          </h1>
          <p className="text-xl text-gray-300 mb-12 animate-fade-in">
            Store your credentials with military-grade encryption, powered by
            blockchain technology
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-3 rounded-lg text-white text-xl font-semibold 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25
            hover:from-emerald-500 hover:to-cyan-600 flex items-center mx-auto
            animate-bounce-slow"
          >
            Get Started
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 animate-fade-in">
          <FeatureCard
            icon={<Lock />}
            title="Decentralized Security"
            description="Your passwords are encrypted and stored across the blockchain network"
          />
          <FeatureCard
            icon={<Key />}
            title="Zero-Knowledge Encryption"
            description="Only you hold the keys to your encrypted data"
          />
          <FeatureCard
            icon={<FileLock2 />}
            title="Immutable Storage"
            description="Blockchain technology ensures your data cannot be tampered with"
          />
        </div>
      </main>
    </div>
  );
};

export default Landing;
