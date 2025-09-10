import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const outbreakAlerts = [
  "🚨 Dengue outbreak reported in Mumbai - Take precautions against mosquitoes",
  "⚠️ Seasonal flu cases rising in Delhi - Get vaccinated now",
  "🔴 Water contamination alert in Chennai - Boil water before drinking",
  "⚠️ Air quality deteriorating in Bangalore - Wear masks outdoors",
  "🚨 Food poisoning cases in Pune - Avoid street food temporarily",
];

export const OutbreakTicker = () => {
  const [currentAlert, setCurrentAlert] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % outbreakAlerts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <AlertTriangle className="w-4 h-4 mr-3 flex-shrink-0" />
          <div className="overflow-hidden flex-1">
            <div className="ticker-content">
              {outbreakAlerts[currentAlert]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};