import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Info, Bell, ArrowRight, Play } from "lucide-react";

const healthTips = [
  "💧 Drink at least 8 glasses of clean water daily",
  "🤲 Wash hands with soap for 20 seconds regularly",
  "💉 Keep your vaccination schedule up to date",
  "🍎 Include fresh fruits and vegetables in your diet",
  "😴 Get 7-8 hours of quality sleep every night",
  "🏃‍♂️ Exercise for at least 30 minutes daily",
  "🚭 Avoid tobacco and limit alcohol consumption",
  "😷 Wear masks in crowded places during flu season",
  "🧘‍♀️ Practice meditation to reduce stress levels",
  "🌞 Get adequate sunlight for Vitamin D synthesis"
];

const outbreakAlerts = [
  "🚨 Dengue cases rising in Maharashtra - Use mosquito nets",
  "⚠️ Seasonal flu vaccination drive starts next week",
  "🏥 Free health checkup camps in rural areas this month",
  "📢 Water purification tablets available at health centers",
  "🩺 COVID-19 booster shots recommended for elderly",
  "🌡️ Heat wave alert - Stay hydrated and avoid sun exposure"
];

const Index = () => {
  const navigate = useNavigate();
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % healthTips.length);
    }, 4000);

    return () => clearInterval(tipTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 page-enter">
      {/* Floating Health Icons */}
      <div className="floating-icon top-20 left-10 text-4xl">❤️</div>
      <div className="floating-icon top-40 right-20 text-3xl">💉</div>
      <div className="floating-icon bottom-32 left-20 text-3xl">🩺</div>
      <div className="floating-icon bottom-20 right-16 text-4xl">🛡️</div>
      <div className="floating-icon top-1/2 left-1/4 text-2xl">🏥</div>
      <div className="floating-icon top-1/3 right-1/3 text-3xl">💊</div>

      {/* Outbreak Alerts Ticker */}
      <div className="bg-destructive/10 border-l-4 border-destructive py-2 overflow-hidden">
        <div className="ticker-content flex items-center text-sm font-medium">
          <Bell className="w-4 h-4 mr-2 text-destructive" />
          {outbreakAlerts.map((alert, index) => (
            <span key={index} className="mx-8 text-destructive">
              {alert}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="glass border-b sticky top-0 z-20">
        <div className="health-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold logo-glow">ISH</h1>
              <div className="futuristic-text text-sm font-semibold">
                Swasthya Connect
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate('/about')}>
                About
              </Button>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="cta-glow" onClick={() => navigate('/chat')}>
                Start Chat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="health-container py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold logo-glow mb-6">ISH</h1>
          <p className="futuristic-text text-2xl md:text-3xl font-bold mb-4">
            Team Innovatrix
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Your AI-powered health companion for preventive care, disease awareness, 
            and wellness guidance in your local language
          </p>
          
          {/* Health Tip Rotation */}
          <Card className="glass max-w-2xl mx-auto p-6 mb-8">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <p className="text-lg font-medium rotating-tip" key={currentTipIndex}>
                {healthTips[currentTipIndex]}
              </p>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/chat')} 
              className="cta-glow text-xl px-10 py-6 text-white"
              size="lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Start Health Chat
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <Button 
              onClick={() => navigate('/login')} 
              variant="outline"
              className="text-xl px-10 py-6 border-2 hover:bg-accent/50"
              size="lg"
            >
              <Users className="w-6 h-6 mr-3" />
              Login & Save Chats
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="health-container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose ISH?</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive healthcare guidance at your fingertips
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Multilingual Support</h3>
            <p className="text-muted-foreground">
              Available in Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, and English
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Mobile Optimized</h3>
            <p className="text-muted-foreground">
              Works perfectly on low-end phones with slow internet connections
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🩺</span>
            </div>
            <h3 className="text-xl font-bold mb-4">AI-Powered Guidance</h3>
            <p className="text-muted-foreground">
              Smart health assistant powered by advanced AI for accurate information
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚨</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Real-time Alerts</h3>
            <p className="text-muted-foreground">
              Get notified about disease outbreaks and health emergencies in your area
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💉</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Vaccination Reminders</h3>
            <p className="text-muted-foreground">
              Never miss important vaccination schedules for you and your family
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Privacy Protected</h3>
            <p className="text-muted-foreground">
              Your health information is encrypted and completely secure
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="health-container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <p className="text-lg text-muted-foreground">Medical Accuracy Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">7+</div>
              <p className="text-lg text-muted-foreground">Languages Supported</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-lg text-muted-foreground">Available Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="health-container py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Health Journey?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust ISH for their healthcare guidance. 
          Get personalized advice, track your health, and stay informed about wellness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/chat')} 
            className="cta-glow text-xl px-12 py-6"
            size="lg"
          >
            <Play className="w-6 h-6 mr-3" />
            Begin Health Chat
          </Button>
          <Button 
            onClick={() => navigate('/about')} 
            variant="outline"
            className="text-xl px-12 py-6 border-2"
            size="lg"
          >
            <Info className="w-6 h-6 mr-3" />
            Learn More
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="health-container">
          <div className="text-center">
            <h3 className="text-2xl font-bold logo-glow mb-4">ISH Swasthya Connect</h3>
            <p className="futuristic-text text-lg mb-6">Team Innovatrix</p>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Committed to making healthcare accessible to every community in India. 
              Building bridges between technology and wellness for a healthier tomorrow.
            </p>
            <div className="flex justify-center gap-6">
              <Button variant="link" onClick={() => navigate('/about')}>About Us</Button>
              <Button variant="link" onClick={() => navigate('/chat')}>Health Chat</Button>
              <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
            </div>
            <div className="mt-8 pt-8 border-t text-sm text-muted-foreground">
              <p>© 2024 Team Innovatrix. Made with ❤️ for healthier communities.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;