import { useState } from "react";
import { RouletteWheel } from "@/components/RouletteWheel";
import { StudySession } from "@/components/StudySession";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AppState = "welcome" | "roulette" | "session" | "dashboard";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [currentSession, setCurrentSession] = useState<{ subject: string; duration: number } | null>(null);

  // Mock user stats - in a real app this would come from a database
  const userStats = {
    totalSessions: 23,
    totalMinutes: 1247,
    currentStreak: 5,
    favoriteSubject: "Mathematics",
    jackpotTokens: 115,
    weeklyGoal: 10,
    completedThisWeek: 7
  };

  const handleSpinComplete = (subject: string, duration: number) => {
    setCurrentSession({ subject, duration });
    setCurrentState("session");
  };

  const handleSessionComplete = () => {
    // In a real app, this would update the user's stats
    setCurrentState("dashboard");
  };

  const renderContent = () => {
    switch (currentState) {
      case "welcome":
        return (
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold jackpot-text animate-pulse">STUDY CASINO</h1>
              <p className="text-2xl text-casino-gold animate-fade-in">Where Every Study Session is a Jackpot! 🎰</p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                Transform your studying into an addictive game. Spin the wheel, earn tokens, build streaks, 
                and compete in our weekly lottery. Knowledge has never been this rewarding!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card className="card-casino hover-scale">
                <CardHeader>
                  <CardTitle className="text-casino-gold">🎯 How It Works</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <p className="text-sm">• Spin the roulette to get a random subject & duration</p>
                  <p className="text-sm">• Your phone locks during the study session</p>
                  <p className="text-sm">• Submit proof of studying to unlock rewards</p>
                  <p className="text-sm">• Build streaks and collect jackpot tokens</p>
                  <p className="text-sm">• Enter weekly lottery with your study achievements</p>
                </CardContent>
              </Card>

              <Card className="card-casino hover-scale">
                <CardHeader>
                  <CardTitle className="text-casino-purple">🏆 Rewards System</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <p className="text-sm">• +5 tokens per completed session</p>
                  <p className="text-sm">• 3x bonus during 7-day streaks</p>
                  <p className="text-sm">• Unlock achievement badges</p>
                  <p className="text-sm">• Lottery tickets for real prizes</p>
                  <p className="text-sm">• Leaderboards and progress tracking</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => setCurrentState("roulette")}
                className="btn-casino-gold text-2xl px-12 py-6 pulse-glow hover-scale"
              >
                🎰 START PLAYING
              </Button>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setCurrentState("dashboard")}
                  variant="outline"
                  className="border-casino-purple text-casino-purple hover:bg-casino-purple hover:text-white hover-scale"
                >
                  📊 View Progress
                </Button>
              </div>
            </div>
          </div>
        );

      case "roulette":
        return (
          <div className="space-y-8 animate-scale-in">
            <div className="text-center">
              <Button 
                onClick={() => setCurrentState("welcome")}
                variant="outline" 
                className="mb-6 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-primary-foreground hover-scale"
              >
                ← Back to Home
              </Button>
            </div>
            <RouletteWheel onSpinComplete={handleSpinComplete} />
          </div>
        );

      case "session":
        return currentSession ? (
          <div className="animate-fade-in">
            <StudySession 
              subject={currentSession.subject}
              duration={currentSession.duration}
              onSessionComplete={handleSessionComplete}
              onBackToWheel={() => setCurrentState("roulette")}
            />
          </div>
        ) : null;

      case "dashboard":
        return (
          <div className="space-y-8 animate-scale-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold jackpot-text mb-2">Your Progress</h2>
              <p className="text-casino-gold text-lg">Keep building that knowledge fortune!</p>
              <div className="flex gap-4 justify-center mt-6">
                <Button 
                  onClick={() => setCurrentState("roulette")}
                  className="btn-casino-gold hover-scale"
                >
                  🎰 Spin Again
                </Button>
                <Button 
                  onClick={() => setCurrentState("welcome")}
                  variant="outline"
                  className="border-casino-purple text-casino-purple hover:bg-casino-purple hover:text-white hover-scale"
                >
                  ← Home
                </Button>
              </div>
            </div>
            <ProgressDashboard stats={userStats} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen roulette-section">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
