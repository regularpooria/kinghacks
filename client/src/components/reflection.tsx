import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { months } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ReflectionsChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I've been watching your journey through the months. What would you like to reflect on together?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState<string>("");
  const [assistantId] = useState<string>("asst_gkjfMEBHeVMCMLoNbdWXX68t");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const initThread = async () => {
      try {
        // Try to use the existing thread
        await client.beta.threads.retrieve("thread_CE1lbDR59b7MsIdnDeBxwkW7");
        setThreadId("thread_CE1lbDR59b7MsIdnDeBxwkW7");
      } catch (error) {
        // If thread doesn't exist, create a new one
        console.log("Existing thread not found, creating new thread");
        const thread = await client.beta.threads.create();
        setThreadId(thread.id);
      }
    };
    initThread();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !threadId) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const response = await getAssistantResponse(threadId, assistantId, userMessage);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error getting assistant response:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't get a response right now. Please try again." }]);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full space-y-8 z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>AI Companion</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif italic">Chat with your Year</h2>
          <p className="text-muted-foreground">Ask about your memories, your progress, or just reflect.</p>
        </div>

        {/* Chat Window */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-primary" : "bg-white/10"}`}>
                      {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-primary" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white/5 text-foreground/90 border border-white/5 rounded-tl-none"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about your year..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 p-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition-all active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
