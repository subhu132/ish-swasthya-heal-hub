import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Droplets, Hand, Shield, Apple, Moon } from "lucide-react";

const healthTips = [
  {
    icon: Droplets,
    tip: "Drink at least 8 glasses of clean water daily",
    description: "Stay hydrated for better health"
  },
  {
    icon: Hand,
    tip: "Wash hands regularly with soap for 20 seconds",
    description: "Prevent infection and disease spread"
  },
  {
    icon: Shield,
    tip: "Get vaccinated according to schedule",
    description: "Protect yourself and your community"
  },
  {
    icon: Apple,
    tip: "Eat 5 servings of fruits and vegetables daily",
    description: "Boost immunity with proper nutrition"
  },
  {
    icon: Moon,
    tip: "Sleep 7-8 hours every night",
    description: "Rest is essential for recovery"
  },
  {
    icon: Heart,
    tip: "Exercise for 30 minutes daily",
    description: "Keep your heart healthy and strong"
  },
];

export const HealthTips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthTips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { icon: Icon, tip, description } = healthTips[currentTip];

  return (
    <Card className="health-tip">
      <CardContent className="p-6 text-center">
        <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{tip}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};