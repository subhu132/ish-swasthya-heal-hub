import { useState, useEffect } from "react";

const healthTips = [
  "💧 Drink clean, boiled water to prevent waterborne diseases",
  "🤲 Wash your hands regularly with soap for 20 seconds",
  "💉 Keep your vaccination schedule up to date",
  "🍎 Eat fresh fruits and vegetables for better immunity",
  "😴 Get 7-8 hours of quality sleep every night",
  "🏃‍♂️ Exercise regularly to maintain good health",
  "🚭 Avoid tobacco and limit alcohol consumption",
  "😷 Wear masks in crowded places during flu season",
  "🌞 Get some sunlight daily for Vitamin D",
  "🧘‍♀️ Practice meditation to reduce stress levels"
];

const LoadingScreen = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 2 : 100);
    }, 60);

    const tipTimer = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % healthTips.length);
    }, 1000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Floating Health Icons */}
      <div className="floating-icon top-20 left-10 text-4xl">❤️</div>
      <div className="floating-icon top-40 right-20 text-3xl">💉</div>
      <div className="floating-icon bottom-32 left-20 text-3xl">🩺</div>
      <div className="floating-icon bottom-20 right-16 text-4xl">🛡️</div>
      
      <div className="glass rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
        {/* ISH Logo */}
        <div className="mb-6">
          <h1 className="text-6xl font-bold logo-glow mb-2">ISH</h1>
          <p className="futuristic-text text-lg font-semibold">Team Innovatrix</p>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="health-spinner"></div>
        </div>

        {/* Health Tip */}
        <div className="mb-6 h-16 flex items-center justify-center">
          <p className="text-lg text-center px-2 rotating-tip" key={currentTip}>
            {healthTips[currentTip]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-accent rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-muted-foreground">
          Initializing your health companion...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;