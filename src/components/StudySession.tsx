import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

interface StudySessionProps {
  subject: string;
  duration: number;
  onSessionComplete: () => void;
  onBackToWheel: () => void;
}

export const StudySession = ({ subject, duration, onSessionComplete, onBackToWheel }: StudySessionProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [studyNotes, setStudyNotes] = useState("");
  const [showProof, setShowProof] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setShowProof(true);
            setIsActive(false);
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startSession = () => {
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const handleSubmitProof = () => {
    if (studyNotes.trim().length < 20) {
      alert("Please provide more detailed study notes (at least 20 characters)");
      return;
    }
    onSessionComplete();
  };

  if (showProof) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="card-casino glow-gold">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl jackpot-text">🎯 TIME'S UP! 🎯</CardTitle>
            <p className="text-xl text-casino-gold">Prove you studied to unlock your rewards!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                What did you learn? Share your notes, insights, or key takeaways:
              </label>
              <Textarea
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
                placeholder="Describe what you studied, key concepts learned, practice problems solved, etc..."
                className="min-h-32"
              />
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={handleSubmitProof}
                className="btn-casino-gold flex-1"
                disabled={studyNotes.trim().length < 20}
              >
                Submit Proof & Claim Rewards! 💰
              </Button>
              <Button 
                onClick={onBackToWheel}
                variant="outline"
                className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-primary-foreground"
              >
                Back to Wheel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="card-casino">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl jackpot-text">{subject} Session</CardTitle>
          <p className="text-casino-gold text-xl font-semibold">{duration} minute study session</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-casino-gold">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-4" />
            <p className="text-muted-foreground">
              {isActive ? "📱 Phone locked - Focus time!" : "Ready to start your study session?"}
            </p>
          </div>

          {!isActive && timeLeft > 0 && (
            <div className="text-center space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-casino-gold mb-2">📱 Session Rules:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your phone will be "locked" during the session</li>
                  <li>• Focus completely on {subject} for {duration} minutes</li>
                  <li>• Take notes, solve problems, or read actively</li>
                  <li>• Submit proof of study when timer ends</li>
                </ul>
              </div>
              <Button 
                onClick={startSession}
                className="btn-casino-gold text-xl px-8 py-4"
              >
                🔒 Lock Phone & Start Session
              </Button>
            </div>
          )}

          {isActive && (
            <div className="text-center space-y-4">
              <div className="bg-destructive/20 border border-destructive/50 p-4 rounded-lg">
                <h4 className="font-semibold text-destructive mb-2">🚫 PHONE LOCKED</h4>
                <p className="text-sm">Stay focused! You can't access other apps until the session ends.</p>
              </div>
              <Button 
                onClick={onBackToWheel}
                variant="outline"
                size="sm"
                className="border-muted text-muted-foreground"
              >
                Emergency Exit (Loses Progress)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};