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

  const handleSpin = async () => {
    setIsSpinning(true);
    setResult(null);

    // Simulate spinning animation
    await new Promise(resolve => setTimeout(resolve, 3000));

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
    setTimeout(() => onSpinComplete(spinResult.subject, spinResult.duration), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="relative">
        <img 
          src={rouletteImage} 
          alt="Casino Roulette Wheel"
          className={`w-80 h-80 rounded-full shadow-2xl ${isSpinning ? 'spin-animation' : ''} ${result ? 'glow-gold' : ''}`}
        />
        {result && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="card-casino text-center bg-background/90 backdrop-blur-md">
              <h3 className="text-2xl font-bold jackpot-text">{result.subject}</h3>
              <p className="text-casino-gold text-xl font-semibold">{result.duration} minutes</p>
            </div>
          </div>
        )}
      </div>

      <div className="text-center space-y-4">
        {!result && !isSpinning && (
          <>
            <h2 className="text-4xl font-bold jackpot-text">STUDY CASINO</h2>
            <p className="text-xl text-muted-foreground">Spin to discover your next study session!</p>
            <Button 
              onClick={handleSpin} 
              className="btn-casino-gold text-2xl px-12 py-6 pulse-glow"
              disabled={isSpinning}
            >
              SPIN THE WHEEL 🎰
            </Button>
          </>
        )}

        {isSpinning && (
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-casino-gold">SPINNING...</h3>
            <p className="text-muted-foreground">Let fate decide your academic destiny!</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-casino-gold">🎉 JACKPOT! 🎉</h3>
            <p className="text-muted-foreground">Get ready to study {result.subject} for {result.duration} minutes</p>
          </div>
        )}
      </div>
    </div>
  );
};