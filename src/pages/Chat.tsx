import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { FloatingHealthIcons } from "@/components/FloatingHealthIcons";
import { Send } from "lucide-react";

// ✅ API URL setup
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? "http://localhost:5000" : "");

console.log("✅ Using API URL:", API_URL);

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
    if (!API_URL) {
      console.error("❌ No API_URL configured!");
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newMessage.text,
          lang: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      const botReplyText =
        data.reply?.parts?.[0]?.text?.trim() ||
        "Sorry, I couldn't process your request.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botReplyText,
        type: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);

      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        type: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorResponse]);
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
            <DialogTitle className="text-center">
              Choose Your Language
            </DialogTitle>
          </DialogHeader>
          <div className="language-grid">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                className="language-option flex flex-col p-4 h-auto"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="text-sm text-muted-foreground">
                  {lang.native}
                </span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Health Assistant Chat
          </h1>
          <p className="text-muted-foreground">
            Get instant answers to your health questions
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="mb-6 p-6 h-96 overflow-y-auto bg-card/80 backdrop-blur-sm">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className={`chat-bubble ${message.type}`}>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-bubble bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setInputMessage("What are the COVID-19 symptoms?")
            }
          >
            COVID-19 Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setInputMessage("When should I get vaccinated?")
            }
          >
            Vaccination Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInputMessage("How to prevent dengue?")}
          >
            Disease Prevention
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
