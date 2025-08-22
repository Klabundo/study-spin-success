import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StudyStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  favoriteSubject: string;
  jackpotTokens: number;
  weeklyGoal: number;
  completedThisWeek: number;
}

interface ProgressDashboardProps {
  stats: StudyStats;
}

export const ProgressDashboard = ({ stats }: ProgressDashboardProps) => {
  const weeklyProgress = (stats.completedThisWeek / stats.weeklyGoal) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Jackpot Tokens */}
      <Card className="card-casino glow-gold">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl jackpot-text">🎰 JACKPOT TOKENS</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-casino-gold mb-2">
            {stats.jackpotTokens}
          </div>
          <p className="text-muted-foreground">Tokens earned</p>
          <Badge className="mt-2 bg-casino-gold text-primary-foreground">
            +5 per session
          </Badge>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card className="card-casino">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-casino-purple">🔥 STUDY STREAK</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-casino-purple mb-2">
            {stats.currentStreak}
          </div>
          <p className="text-muted-foreground">Days in a row</p>
          {stats.currentStreak >= 7 && (
            <Badge className="mt-2 bg-casino-purple text-white">
              🏆 Week Champion!
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="card-casino">
        <CardHeader>
          <CardTitle className="text-xl text-casino-pink">📊 Weekly Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{stats.completedThisWeek}/{stats.weeklyGoal} sessions</span>
          </div>
          <Progress value={weeklyProgress} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {weeklyProgress >= 100 ? "🎉 Goal completed!" : `${Math.ceil(stats.weeklyGoal - stats.completedThisWeek)} sessions to go`}
          </p>
        </CardContent>
      </Card>

      {/* Total Stats */}
      <Card className="card-casino">
        <CardHeader>
          <CardTitle className="text-xl text-casino-green">📈 Total Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sessions:</span>
            <span className="font-semibold">{stats.totalSessions}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Study time:</span>
            <span className="font-semibold">{Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Favorite:</span>
            <span className="font-semibold text-casino-gold">{stats.favoriteSubject}</span>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-casino">
        <CardHeader>
          <CardTitle className="text-xl text-casino-blue">🏅 Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="text-xs p-1 text-center">
              {stats.totalSessions >= 10 ? "🎯" : "🔒"} Rookie
            </Badge>
            <Badge variant="outline" className="text-xs p-1 text-center">
              {stats.currentStreak >= 7 ? "🔥" : "🔒"} Streaker
            </Badge>
            <Badge variant="outline" className="text-xs p-1 text-center">
              {stats.totalMinutes >= 1000 ? "⏰" : "🔒"} Scholar
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Keep studying to unlock more!
          </p>
        </CardContent>
      </Card>

      {/* Lottery Pool */}
      <Card className="card-casino glow-royal">
        <CardHeader>
          <CardTitle className="text-xl jackpot-text">🎫 Lottery Pool</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold text-casino-pink mb-1">
            $247.50
          </div>
          <p className="text-xs text-muted-foreground">Current prize pool</p>
          <div className="mt-2 text-xs">
            <span className="text-casino-gold">Your tickets: 3</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Draw every Sunday!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};