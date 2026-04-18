import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { Music2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function AuthView() {
  const { signInWithGoogle, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6 max-w-sm w-full text-center"
      >
        <Music2 className="text-spotify-green w-16 h-16" />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight">VibeStream</h1>
          <p className="text-text-dim">Millions of songs. Free on VibeStream.</p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 px-6 rounded-full hover:scale-105 transition-all mt-4"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-xs text-text-dim mt-8">
          By continuing, you agree to VibeStream's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
