import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Send, Plus, Globe, User, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatTab {
  id: string;
  title: string;
  messages: Message[];
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
];

const Chat = () => {
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [chatTabs, setChatTabs] = useState<ChatTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatTabs]);

  const createNewChat = () => {
    const newChat: ChatTab = {
      id: Date.now().toString(),
      title: `Health Chat ${chatTabs.length + 1}`,
      messages: [{
        id: '1',
        content: selectedLanguage === 'hi' 
          ? 'नमस्ते! मैं आपका स्वास्थ्य सहायक हूं। मैं आपकी स्वास्थ्य संबंधी समस्याओं में मदद कर सकता हूं।'
          : 'Hello! I\'m your health assistant. How can I help you with your health concerns today?',
        isUser: false,
        timestamp: new Date()
      }]
    };
    setChatTabs([...chatTabs, newChat]);
    setActiveTabId(newChat.id);
  };

  const sendMessage = async () => {
    if (!message.trim() || !activeTabId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date()
    };

    setChatTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, messages: [...tab.messages, userMessage] }
        : tab
    ));

    setMessage('');
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual Claude/Gemini API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: selectedLanguage === 'hi'
          ? 'मैं आपकी स्वास्थ्य संबंधी चिंताओं को समझ रहा हूं। कृपया अधिक विवरण बताएं ताकि मैं बेहतर सलाह दे सकूं।'
          : 'I understand your health concern. Could you provide more details so I can give you better guidance? Remember, this is for informational purposes only.',
        isUser: false,
        timestamp: new Date()
      };

      setChatTabs(prev => prev.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, messages: [...tab.messages, botResponse] }
          : tab
      ));
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguageModal(false);
    createNewChat();
  };

  const activeChat = chatTabs.find(tab => tab.id === activeTabId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-primary/5 page-enter">
      {/* Language Selection Modal */}
      <Dialog open={showLanguageModal} onOpenChange={setShowLanguageModal}>
        <DialogContent className="glass max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center justify-center">
              <Globe className="w-5 h-5" />
              Select Your Language
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="outline"
                onClick={() => selectLanguage(lang.code)}
                className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-primary/10 transition-all"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="glass border-b sticky top-0 z-10">
        <div className="health-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="logo-glow text-2xl font-bold"
              >
                ISH
              </Button>
              <div className="futuristic-text text-sm">Health Assistant</div>
            </div>
            <Button onClick={createNewChat} size="sm" className="cta-glow">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="health-container py-4 flex gap-4 h-[calc(100vh-80px)]">
        {/* Chat Tabs Sidebar */}
        <div className="w-64 hidden md:block">
          <Card className="glass h-full p-4">
            <h3 className="font-semibold mb-4">Your Conversations</h3>
            <div className="space-y-2">
              {chatTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTabId === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTabId(tab.id)}
                  className="w-full justify-start text-left p-3 h-auto"
                >
                  <div className="truncate">
                    <div className="font-medium truncate">{tab.title}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {tab.messages[tab.messages.length - 1]?.content.substring(0, 30)}...
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Messages */}
              <Card className="glass flex-1 p-6 mb-4 overflow-hidden">
                <div className="h-full overflow-y-auto space-y-4">
                  {activeChat.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-3 max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                        }`}>
                          {msg.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={msg.isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="chat-bubble-bot">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </Card>

              {/* Message Input */}
              <Card className="glass p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={selectedLanguage === 'hi' ? 'अपना सवाल यहाँ लिखें...' : 'Type your health question here...'}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!message.trim() || isLoading} className="cta-glow">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {selectedLanguage === 'hi' 
                    ? 'यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है। गंभीर समस्याओं के लिए डॉक्टर से सलाह लें।'
                    : 'This information is for educational purposes only. Consult a doctor for serious health issues.'
                  }
                </p>
              </Card>
            </>
          ) : (
            <Card className="glass flex-1 flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">Welcome to ISH Health Assistant</h2>
                <p className="text-muted-foreground mb-4">Start a new conversation to get health guidance</p>
                <Button onClick={createNewChat} className="cta-glow">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;