import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showCasino, setShowCasino] = useState(false);

  if (!showCasino) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl mx-auto p-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              STUDY CASINO
            </h1>
            <p className="text-2xl text-yellow-400">Where Every Study Session is a Jackpot! 🎰</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transform your studying into an addictive game. Spin the wheel, earn tokens, build streaks, 
              and compete in our weekly lottery. Knowledge has never been this rewarding!
            </p>
          </div>
          
          <Button 
            onClick={() => setShowCasino(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-2xl px-12 py-6 rounded-xl hover:scale-105 transition-transform shadow-2xl"
          >
            🎰 START PLAYING
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-4xl mx-auto p-8">
        <h2 className="text-4xl font-bold text-yellow-400">🎯 Casino Features Loading...</h2>
        <p className="text-gray-300">Roulette wheel, study sessions, and progress tracking coming right up!</p>
        <Button 
          onClick={() => setShowCasino(false)}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
        >
          ← Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Index;
