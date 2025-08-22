import { useState } from "react";
import { Button } from "@/components/ui/button";
import rouletteImage from "@/assets/roulette-wheel.jpg";

const SUBJECTS = [
  { name: "Mathematics", color: "casino-gold", duration: [15, 30, 45, 60] },
  { name: "Science", color: "casino-purple", duration: [20, 40, 60, 90] },
  { name: "English", color: "casino-pink", duration: [15, 25, 45, 60] },
  { name: "History", color: "casino-green", duration: [20, 30, 50, 75] },
  { name: "Language", color: "casino-blue", duration: [15, 30, 45, 60] },
  { name: "Arts", color: "casino-gold", duration: [30, 45, 60, 90] }
];

interface RouletteWheelProps {
  onSpinComplete: (subject: string, duration: number) => void;
}

export const RouletteWheel = ({ onSpinComplete }: RouletteWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ subject: string; duration: number } | null>(null);
  const [spinRotation, setSpinRotation] = useState(0);

  const handleSpin = async () => {
    setIsSpinning(true);
    setResult(null);

    // Calculate random final rotation (multiple full spins + random position)
    const spins = 5 + Math.random() * 5; // 5-10 full spins
    const finalRotation = spinRotation + (spins * 360) + (Math.random() * 360);
    setSpinRotation(finalRotation);

    // Wait for spin animation to complete
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Random selection
    const randomSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const randomDuration = randomSubject.duration[Math.floor(Math.random() * randomSubject.duration.length)];

    const spinResult = {
      subject: randomSubject.name,
      duration: randomDuration
    };

    setResult(spinResult);
    setIsSpinning(false);
    
    // Delay before calling onSpinComplete to show result
    setTimeout(() => onSpinComplete(spinResult.subject, spinResult.duration), 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-fade-in">
      {/* Roulette Table Background */}
      <div className="relative bg-gradient-to-br from-green-800 to-green-900 p-8 rounded-full border-4 border-casino-gold shadow-2xl">
        {/* Betting Markers */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-casino-gold rounded-full animate-pulse"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-casino-pink rounded-full animate-pulse delay-300"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-casino-purple rounded-full animate-pulse delay-700"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-casino-blue rounded-full animate-pulse delay-1000"></div>
        
        {/* Main Roulette Wheel */}
        <div className="relative">
          <img 
            src={rouletteImage} 
            alt="Casino Roulette Wheel"
            className={`w-80 h-80 rounded-full shadow-2xl transition-transform duration-4000 ease-out ${result ? 'glow-gold' : ''}`}
            style={{ 
              transform: `rotate(${spinRotation}deg)`,
              filter: isSpinning ? 'blur(1px)' : 'none'
            }}
          />
          
          {/* Center Ball */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg ${isSpinning ? 'animate-pulse' : ''}`}></div>
          
          {/* Winning Pointer */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-casino-gold shadow-lg"></div>
          
          {/* Result Display */}
          {result && (
            <div className="absolute inset-0 flex items-center justify-center animate-scale-in">
              <div className="card-casino text-center bg-background/95 backdrop-blur-md glow-gold">
                <h3 className="text-3xl font-bold jackpot-text animate-pulse">{result.subject}</h3>
                <p className="text-casino-gold text-2xl font-semibold">{result.duration} minutes</p>
                <div className="text-4xl mt-2">🎉</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subject Indicators */}
      <div className="flex flex-wrap justify-center gap-3 max-w-md">
        {SUBJECTS.map((subject, index) => (
          <div key={subject.name} className={`px-3 py-1 rounded-full text-sm font-medium border animate-fade-in bg-${subject.color}/10 border-${subject.color} text-${subject.color}`} style={{ animationDelay: `${index * 100}ms` }}>
            {subject.name}
          </div>
        ))}
      </div>

      <div className="text-center space-y-4">
        {!result && !isSpinning && (
          <div className="space-y-6">
            <h2 className="text-5xl font-bold jackpot-text animate-pulse">STUDY CASINO</h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Spin to discover your next study session! The wheel of knowledge awaits! 🎰
            </p>
            <Button 
              onClick={handleSpin} 
              className="btn-casino-gold text-2xl px-12 py-6 pulse-glow hover-scale animate-bounce"
              disabled={isSpinning}
            >
              🎰 SPIN THE WHEEL OF KNOWLEDGE
            </Button>
          </div>
        )}

        {isSpinning && (
          <div className="space-y-4 animate-pulse">
            <h3 className="text-3xl font-bold text-casino-gold">🎲 SPINNING... 🎲</h3>
            <p className="text-lg text-muted-foreground">Let fate decide your academic destiny!</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-casino-gold rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-casino-purple rounded-full animate-bounce delay-75"></div>
              <div className="w-3 h-3 bg-casino-pink rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-casino-gold animate-pulse">🎉 JACKPOT! 🎉</h3>
              <p className="text-xl text-muted-foreground">
                Congratulations! You've won a <span className="text-casino-gold font-bold">{result.duration}-minute</span> study session in <span className="text-casino-purple font-bold">{result.subject}</span>!
              </p>
              <div className="text-6xl animate-bounce">💰</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};