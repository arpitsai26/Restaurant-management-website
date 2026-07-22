import { Link } from "react-router";
import { motion } from "motion/react";
import { Crown, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Crown className="w-12 h-12 text-primary/30 mx-auto mb-8" />
          <h1 className="font-['Playfair_Display'] text-9xl font-bold text-primary/20 mb-2">404</h1>
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold text-[#f0ebe0] mb-4">
            This table isn't reserved
          </h2>
          <p className="text-[#7a7065] mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have moved. Let us guide you back to the dining room.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-8 py-3 bg-primary text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4a843] transition-all duration-300">
              Return Home
            </Link>
            <Link to="/menu" className="inline-flex items-center gap-2 px-8 py-3 border border-[rgba(200,155,60,0.3)] text-[#c8b89a] rounded-lg hover:border-primary hover:text-primary transition-all duration-300">
              View Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
