import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Target, Users, Award, TrendingUp, Heart, Shield } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const navigate = useNavigate();
  const [accuracyProgress, setAccuracyProgress] = useState(0);
  const [awarenessProgress, setAwarenessProgress] = useState(0);
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    // Animate progress bars
    const timer1 = setTimeout(() => setAccuracyProgress(85), 500);
    const timer2 = setTimeout(() => setAwarenessProgress(75), 1000);
    const timer3 = setTimeout(() => setUserProgress(92), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/10 page-enter">
      {/* Floating Health Icons */}
      <div className="floating-icon top-20 left-10 text-4xl">🎯</div>
      <div className="floating-icon top-40 right-20 text-3xl">🏆</div>
      <div className="floating-icon bottom-32 left-20 text-3xl">📈</div>
      <div className="floating-icon bottom-20 right-16 text-4xl">✨</div>

      {/* Header */}
      <div className="glass border-b">
        <div className="health-container py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="logo-glow text-2xl font-bold"
            >
              ISH
            </Button>
            <div className="futuristic-text text-sm">About Our Mission</div>
          </div>
        </div>
      </div>

      <div className="health-container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 logo-glow">Team Innovatrix</h1>
          <p className="futuristic-text text-2xl mb-8">
            Hungry to Win, Committed to Health
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are passionate innovators dedicated to revolutionizing healthcare accessibility 
              in rural and semi-urban India. Our mission is to bridge the healthcare gap through 
              technology, making preventive care and health education available to everyone.
            </p>
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass p-8 text-center hover:shadow-lg transition-all">
            <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              Democratize healthcare knowledge and make preventive care accessible 
              to every community, regardless of location or economic status.
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-lg transition-all">
            <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              A world where every person has access to reliable health information 
              and guidance, empowering communities to make informed health decisions.
            </p>
          </Card>

          <Card className="glass p-8 text-center hover:shadow-lg transition-all">
            <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-4">Our Values</h3>
            <p className="text-muted-foreground">
              Innovation, accessibility, cultural sensitivity, and unwavering 
              commitment to improving health outcomes for underserved communities.
            </p>
          </Card>
        </div>

        {/* Impact Stats */}
        <Card className="glass p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Chatbot Accuracy</h3>
              <div className="mb-2">
                <Progress value={accuracyProgress} className="h-3" />
              </div>
              <p className="text-2xl font-bold text-primary">{accuracyProgress}%</p>
              <p className="text-sm text-muted-foreground">Medical information accuracy</p>
            </div>

            <div className="text-center">
              <Heart className="w-8 h-8 mx-auto mb-4 text-secondary" />
              <h3 className="text-lg font-semibold mb-2">Health Awareness</h3>
              <div className="mb-2">
                <Progress value={awarenessProgress} className="h-3" />
              </div>
              <p className="text-2xl font-bold text-secondary">{awarenessProgress}%</p>
              <p className="text-sm text-muted-foreground">Increase in community awareness</p>
            </div>

            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">User Satisfaction</h3>
              <div className="mb-2">
                <Progress value={userProgress} className="h-3" />
              </div>
              <p className="text-2xl font-bold text-primary">{userProgress}%</p>
              <p className="text-sm text-muted-foreground">Positive user feedback</p>
            </div>
          </div>
        </Card>

        {/* Commitment Statement */}
        <Card className="glass p-12 text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Team Innovatrix is not just building technology; we're building hope. 
              We understand that healthcare is a fundamental right, not a privilege. 
              Our chatbot serves as a bridge between communities and healthcare knowledge, 
              offering guidance in local languages and cultural contexts.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are committed to continuous learning, improvement, and innovation. 
              Every interaction with our platform helps us better understand the needs 
              of our users and refine our approach to serving them better.
            </p>
          </div>
        </Card>

        {/* Features Highlight */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4">🌍 Multilingual Support</h3>
            <p className="text-muted-foreground">
              Available in Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, and English 
              to ensure no one is left behind due to language barriers.
            </p>
          </Card>

          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4">📱 Mobile-First Design</h3>
            <p className="text-muted-foreground">
              Optimized for low-end devices and slow networks, ensuring accessibility 
              for users across all economic backgrounds.
            </p>
          </Card>

          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4">🔒 Privacy Protected</h3>
            <p className="text-muted-foreground">
              Your health information is encrypted and secure. We prioritize user 
              privacy and follow strict data protection protocols.
            </p>
          </Card>

          <Card className="glass p-6">
            <h3 className="text-xl font-bold mb-4">⚡ Real-time Alerts</h3>
            <p className="text-muted-foreground">
              Stay informed about disease outbreaks, vaccination drives, and 
              important health announcements in your area.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Health Revolution</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the change. Start your health journey with our AI-powered 
            assistant and help us build a healthier future for all communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/chat')} 
              className="cta-glow text-lg px-8 py-6"
              size="lg"
            >
              Start Health Chat
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              size="lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;