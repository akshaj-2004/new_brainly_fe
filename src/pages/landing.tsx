import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Link2, Share2, Search } from "lucide-react";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-gray-100">
  <div 
    onClick={() => navigate("/dashboard")} 
    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
  >
    <Brain className="text-indigo-600 w-6 h-6" />
    <h1 className="text-xl font-semibold text-gray-800">Brainly</h1>
  </div>
  <button
    onClick={() => navigate("/signin")}
    className="text-gray-700 font-medium hover:text-indigo-600 transition"
  >
    Sign In
  </button>
</header>


      {/* Hero Section */}
      <main className="flex flex-col items-center text-center px-6 md:px-12 mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Your Second Brain for the Internet 🌐
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-2xl mb-8"
        >
          Save, organize, and share your favorite links, articles, and resources —
          all in one intelligent, searchable space. Stay focused, stay curious,
          and never lose an idea again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Start for Free
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
          >
            Sign In
          </button>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="mt-24 px-6 md:px-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
        <FeatureCard
          icon={<Link2 className="w-8 h-8 text-indigo-600" />}
          title="Save Anything"
          desc="Capture links, notes, and resources from anywhere with a single click."
        />
        <FeatureCard
          icon={<Search className="w-8 h-8 text-indigo-600" />}
          title="Smart Search"
          desc="Find exactly what you need instantly with AI-powered tagging and filters."
        />
        <FeatureCard
          icon={<Share2 className="w-8 h-8 text-indigo-600" />}
          title="Share Seamlessly"
          desc="Publish curated collections or share ideas publicly with your community."
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Brainly
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </motion.div>
);
