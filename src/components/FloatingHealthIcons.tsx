import { Heart, Shield, Activity, Stethoscope, Plus, Pill } from "lucide-react";

export const FloatingHealthIcons = () => {
  const icons = [
    { Icon: Heart, top: "10%", left: "5%", delay: "0s" },
    { Icon: Shield, top: "20%", left: "85%", delay: "1s" },
    { Icon: Activity, top: "60%", left: "8%", delay: "2s" },
    { Icon: Stethoscope, top: "70%", left: "80%", delay: "3s" },
    { Icon: Plus, top: "40%", left: "15%", delay: "4s" },
    { Icon: Pill, top: "80%", left: "20%", delay: "5s" },
    { Icon: Heart, top: "15%", left: "50%", delay: "6s" },
    { Icon: Shield, top: "85%", left: "90%", delay: "7s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => {
        const { Icon, top, left, delay } = item;
        return (
          <Icon
            key={index}
            className="floating-icon w-8 h-8 text-primary/20"
            style={{
              position: "absolute",
              top,
              left,
              animationDelay: delay,
            }}
          />
        );
      })}
    </div>
  );
};