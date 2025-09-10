import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MessageCircle } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simulate Google login - replace with actual OAuth implementation
    console.log("Google login initiated");
    // After successful login, redirect to chat
    navigate('/chat');
  };

  const handleGuestAccess = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4 page-enter">
      {/* Floating Health Icons */}
      <div className="floating-icon top-20 left-10 text-4xl">💊</div>
      <div className="floating-icon top-40 right-20 text-3xl">🏥</div>
      <div className="floating-icon bottom-32 left-20 text-3xl">📱</div>
      <div className="floating-icon bottom-20 right-16 text-4xl">⚕️</div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold logo-glow mb-4">ISH</h1>
          <p className="futuristic-text text-xl font-semibold mb-2">Team Innovatrix</p>
          <p className="text-muted-foreground">Your Health Companion Awaits</p>
        </div>

        {/* Login Card */}
        <Card className="glass p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-sm text-muted-foreground">
              Login to save your chats & get personalized health tips
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Sign-In Button */}
            <Button 
              onClick={handleGoogleLogin}
              className="w-full cta-glow text-lg py-6"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            {/* Guest Access */}
            <Button 
              onClick={handleGuestAccess}
              variant="outline"
              className="w-full py-6 text-lg border-2 hover:bg-accent/50"
              size="lg"
            >
              <Users className="w-5 h-5 mr-3" />
              Continue as Guest
            </Button>
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="glass p-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Personalized Health Chats</h3>
                <p className="text-sm text-muted-foreground">Save and track your health conversations</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-semibold">Privacy Protected</h3>
                <p className="text-sm text-muted-foreground">Your health data is secure and encrypted</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our health information guidelines
          </p>
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary-glow"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;