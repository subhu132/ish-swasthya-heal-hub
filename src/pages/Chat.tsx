import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { FloatingHealthIcons } from "@/components/FloatingHealthIcons";
import { Send } from "lucide-react";

// ✅ Set your backend URL in Vercel environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
];

interface Message {
  id: string;
  text: string;
  type: "user" | "bot";
  timestamp: Date;
}

const Chat = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageModal(false);

    // Welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Hello! I'm your health assistant. How can I help you today?",
      type: "bot",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          lang: selectedLanguage,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn't process your request.",
        type: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        type: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHealthIcons />
      <Navigation />

      {/* Language Selection Modal */}
      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose Your Language</DialogTitle>
          </DialogHeader>
          <div className="language-grid grid gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                className="language-option flex flex-col p-4 h-auto"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="text-sm text-muted-foreground">{lang.native}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Health Assistant Chat</h1>
          <p className="text-muted-foreground">Get instant answers to your health questions</p>
        </div>

        {/* Chat Messages */}
        <Card className="mb-6 p-6 h-96 overflow-y-auto bg-card/80 backdrop-blur-sm">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`chat-bubble ${msg.type}`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble bot flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your health question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setInputMessage("What are the COVID-19 symptoms?")}>
            COVID-19 Info
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInputMessage("When should I get vaccinated?")}>
            Vaccination Schedule
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInputMessage("How to prevent dengue?")}>
            Disease Prevention
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
