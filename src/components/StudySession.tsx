import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
  const [motivationMessage, setMotivationMessage] = useState("");

  const motivationMessages = [
    "🧠 Your brain is building new neural pathways!",
    "⭐ Every minute counts towards your success!",
    "🔥 You're on fire! Keep that focus burning!",
    "💪 Your future self will thank you!",
    "🎯 Excellence is a habit, not an accident!",
    "🚀 You're leveling up your knowledge!",
    "💎 Pressure makes diamonds - you're becoming one!",
    "🌟 Champions are made in moments like these!"
  ];

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
          
          // Show motivation every 5 minutes
          if (timeLeft % 300 === 0 && timeLeft > 0) {
            const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
            setMotivationMessage(randomMessage);
            setTimeout(() => setMotivationMessage(""), 3000);
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
    setMotivationMessage("🎯 Session started! Lock in and focus!");
    setTimeout(() => setMotivationMessage(""), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const earnedTokens = Math.floor(progress / 20); // 1 token per 20% progress

  const handleSubmitProof = () => {
    if (studyNotes.trim().length < 20) {
      alert("Please provide more detailed study notes (at least 20 characters) to claim your rewards!");
      return;
    }
    onSessionComplete();
  };

  if (showProof) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Card className="card-casino glow-gold">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl jackpot-text animate-pulse">🏆 SESSION COMPLETE! 🏆</CardTitle>
            <p className="text-xl text-casino-gold">Time to claim your knowledge rewards!</p>
            <div className="flex justify-center gap-4 mt-4">
              <Badge className="bg-casino-gold text-primary-foreground text-lg px-4 py-2">
                +5 Tokens Earned! 🪙
              </Badge>
              <Badge className="bg-casino-purple text-white text-lg px-4 py-2">
                Streak +1 🔥
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold text-casino-gold mb-2">📝 Proof of Study Required:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                To unlock your rewards and maintain the integrity of Study Casino, please share what you learned:
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                What did you study? (Key concepts, notes, insights, practice problems solved...)
              </label>
              <Textarea
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
                placeholder="Example: Studied calculus derivatives - learned product rule and chain rule. Solved 8 practice problems on finding slopes of tangent lines. Key insight: derivative represents instantaneous rate of change..."
                className="min-h-32"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {studyNotes.length}/20 characters minimum
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={handleSubmitProof}
                className="btn-casino-gold flex-1 hover-scale"
                disabled={studyNotes.trim().length < 20}
              >
                🎰 Claim Jackpot Rewards! (+5 Tokens)
              </Button>
              <Button 
                onClick={onBackToWheel}
                variant="outline"
                className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-primary-foreground hover-scale"
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
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="card-casino">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl jackpot-text">{subject} Casino Session</CardTitle>
          <p className="text-casino-gold text-xl font-semibold">{duration}-minute knowledge jackpot</p>
          <div className="flex justify-center gap-2 mt-2">
            <Badge variant="outline" className="border-casino-gold text-casino-gold">
              🪙 +{earnedTokens} tokens earned
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-7xl font-bold text-casino-gold animate-pulse">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-6" />
            <p className="text-muted-foreground font-medium">
              {isActive ? "🔒 Phone locked - Knowledge acquisition in progress!" : "Ready to start your study casino session?"}
            </p>
            
            {motivationMessage && (
              <div className="bg-casino-gold/10 border border-casino-gold/50 p-3 rounded-lg animate-scale-in">
                <p className="text-casino-gold font-medium">{motivationMessage}</p>
              </div>
            )}
          </div>

          {!isActive && timeLeft > 0 && (
            <div className="text-center space-y-4">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold text-casino-gold mb-4">🎰 Study Casino Rules:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="space-y-2">
                    <p>🔒 Phone will be locked during session</p>
                    <p>🎯 Focus completely on {subject}</p>
                    <p>📚 Take detailed notes or solve problems</p>
                  </div>
                  <div className="space-y-2">
                    <p>🪙 Earn tokens for completion</p>
                    <p>🔥 Build your study streak</p>
                    <p>🏆 Unlock achievement badges</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={startSession}
                className="btn-casino-gold text-xl px-8 py-6 pulse-glow hover-scale"
              >
                🎰 Lock & Load - Start Jackpot Session!
              </Button>
            </div>
          )}

          {isActive && (
            <div className="text-center space-y-4">
              <div className="bg-destructive/20 border border-destructive/50 p-6 rounded-lg">
                <h4 className="font-semibold text-destructive mb-2">🚫 CASINO LOCKDOWN ACTIVE</h4>
                <p className="text-sm">Stay focused! The house always wins when you stick to the game plan.</p>
                <div className="mt-4 flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl">🧠</div>
                    <p className="text-xs">Brain Active</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🔒</div>
                    <p className="text-xs">Phone Locked</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl">🎯</div>
                    <p className="text-xs">Focus Mode</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={onBackToWheel}
                variant="outline"
                size="sm"
                className="border-muted text-muted-foreground hover:bg-muted/20"
              >
                Emergency Exit (Forfeits All Tokens)
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};