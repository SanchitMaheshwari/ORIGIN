import React, { useState, useRef, useEffect } from 'react';
import { Bot, Minus, Send, Sparkles, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantDrawerProps {
  onOpenGrievance?: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ onOpenGrievance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! I provide factual answers strictly from the official FRA Decision Support database. How can I assist with claim verification or GIS anomalies today?',
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'bot',
      isAiInsight: true,
      text: 'Verified System Response: Claim F-412 (Bandhavgarh) is stalled at DLC level due to a 0.6 Ha discrepancy between RoR satellite geofence and Gram Sabha resolution. Field survey is scheduled for 22 Aug 2026.',
      timestamp: '10:01 AM'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuery('');

    // Formulate response
    const qLower = query.toLowerCase();
    let botReply = '';
    let isInsight = false;

    if (qLower.includes('delay') || qLower.includes('bandhavgarh') || qLower.includes('f-412') || qLower.includes('mangar')) {
      botReply = 'AI Explanation: Claim F-412 in Bandhavgarh (Claimant: Mangar Gond) is delayed due to insufficient GPS geofence match and land record variance (0.6 ha mismatch against RoR). Re-verification has been scheduled by the SDLC team for 22 Aug 2026.';
      isInsight = true;
    } else if (qLower.includes('karnataka')) {
      botReply = 'Karnataka Official Summary (MoTA): Total Claims Recorded: 295,176 (289,236 IFR, 5,940 CFR) | Titles Conferred: 16,700 (5.7%) | Rejected: 262,626 (89.0% bottleneck) | Pending in SDLC/DLC: 15,850. Priority Districts: Shimoga (95.4k claims), Uttara Kannada (85.1k claims), Chickmagalur.';
      isInsight = true;
    } else if (qLower.includes('telangana')) {
      botReply = 'Telangana Official Summary (MoTA): Total Claims Recorded: 655,249 (651,822 IFR, 3,427 CFR) | Titles Conferred: 231,456 (35.3%) | Pending in SDLC/DLC: 329,367 (50.3% backlog) | Rejected: 94,426. Priority Districts: Bhadradri Kothagudem (139.7k claims), Adilabad (64.7k claims), Asifabad (60.3k claims).';
      isInsight = true;
    } else if (qLower.includes('state') || qLower.includes('odisha')) {
      botReply = 'State Summaries (Official MoTA Dataset): Karnataka has 295,176 claims (16,700 titles conferred, 262,626 rejected, 89% rejection bottleneck). Telangana has 655,249 claims (231,456 titles conferred, 329,367 pending backlog, 50.3% pending rate). Priority focus: Shimoga & Bhadradri Kothagudem.';
      isInsight = true;
    } else if (qLower.includes('national') || qLower.includes('total') || qLower.includes('india') || qLower.includes('mota')) {
      botReply = 'MoTA National Metrics: 315,000 total claims recorded nationwide; 210,000 titles conferred (66.6%); 95,000 pending. National AI anomaly rate stands at 1.1% (3,465 flags). 18 States are currently on track (>60% title rate).';
      isInsight = true;
    } else if (qLower.includes('khasra') || qLower.includes('gis') || qLower.includes('anomaly') || qLower.includes('score')) {
      botReply = 'AI Anomaly Scoring Protocol: Scores above 7.0 indicate high discrepancy risk (e.g., GPS cadastral overlap, 3-generation lineage gap for OTFDs, or missing Gram Sabha quorum signatures). Human statutory verification by SDLC/DLC is mandatory.';
      isInsight = true;
    } else if (qLower.includes('quorum') || qLower.includes('gram sabha') || qLower.includes('rule')) {
      botReply = 'FRA 2006 Rule 4(1): Gram Sabha quorum requires at least 50% presence of total adult residents, with a minimum of 33% female representation. Resolutions passed without fulfilling this quorum are flagged by FRA-MITRA for re-verification.';
    } else if (qLower.includes('grievance') || qLower.includes('appeal')) {
      botReply = 'Grievance Filing: Claimants can submit an appeal against delays or boundary discrepancies directly to the Sub-Divisional Level Committee (SDLC) within 60 days of Gram Sabha or SDLC notice.';
    } else {
      botReply = 'System Notice: Insufficient Information in the verified FRA-MITRA knowledge base for this specific request. Please refer to statutory FRA Guidelines 2006 or consult your local Sub-Divisional Level Committee officer.';
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          isAiInsight: isInsight,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <aside aria-label="FRA-MITRA AI Assistant" className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Drawer Panel */}
      {isOpen && (
        <div
          id="ai-chat-window"
          className="mb-3 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-3 glass-modal"
          style={{ border: '1px solid rgba(118,196,87,0.30)' }}
        >
          {/* Chat Header */}
          <div className="text-white p-3.5 flex items-center justify-between" style={{ background: '#2A7C13' }}>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs shadow-inner" style={{ background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.3)' }}>
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Ask FRA-MITRA AI</h4>
                <span className="text-[10px] text-white/80">Ground-truth verified Decision Support</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white text-sm p-1 rounded-md hover:bg-white/10 transition cursor-pointer"
              title="Minimize chat"
              aria-label="Minimize chat"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick suggestions chips */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 overflow-x-auto text-[10px] border-b"
               style={{ background: 'rgba(255, 248, 207, 0.45)', borderColor: 'rgba(118,196,87,0.20)' }}>
            <button
              onClick={() => handleSend('Explain delay on Claim F-412')}
              className="glass-chip text-[#2A7C13] cursor-pointer"
            >
              Delay reason F-412
            </button>
            <button
              onClick={() => handleSend('What is the Odisha state progress?')}
              className="glass-chip text-[#2A7C13] cursor-pointer"
            >
              Odisha stats
            </button>
            <button
              onClick={() => handleSend('National overview')}
              className="glass-chip text-[#2A7C13] cursor-pointer"
            >
              National summary
            </button>
          </div>

          {/* Messages Stream */}
          <div className="p-3 h-64 overflow-y-auto space-y-2.5 text-xs bg-transparent scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#2A7C13] text-white p-2.5 rounded-xl ml-auto max-w-[85%] text-right font-medium shadow-xs'
                    : msg.isAiInsight
                    ? 'p-2.5 rounded-xl space-y-1 shadow-xs border'
                    : 'p-2.5 rounded-xl border shadow-xs space-y-1'
                }`}
                style={
                  msg.sender === 'user'
                    ? {}
                    : msg.isAiInsight
                    ? {
                        background: 'rgba(255, 248, 207, 0.70)',
                        borderColor: 'rgba(118, 196, 87, 0.35)',
                        color: '#1C2B22'
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.85)',
                        borderColor: 'rgba(118, 196, 87, 0.20)',
                        color: '#1C2B22'
                      }
                }
              >
                {msg.sender === 'bot' && (
                  <span className="text-[10px] text-[#2A7C13] font-bold block flex items-center space-x-1">
                    {msg.isAiInsight ? (
                      <Sparkles className="w-3 h-3 text-[#2A7C13] inline mr-1" />
                    ) : (
                      <Info className="w-3 h-3 text-[#2A7C13] inline mr-1" />
                    )}
                    <span>{msg.isAiInsight ? 'Verified System Response:' : 'FRA-MITRA Knowledge Bot'}</span>
                  </span>
                )}
                <p className="leading-relaxed">{msg.text}</p>
                <span className="text-[9px] text-slate-500 block text-right pt-0.5">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Strict Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-2.5 border-t flex items-center space-x-2"
            style={{ background: 'rgba(255, 255, 255, 0.75)', borderColor: 'rgba(118,196,87,0.20)' }}
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask claim status or anomaly reason..."
              className="glass-input flex-1 !py-1.5 !px-3 text-xs"
            />
            <button
              type="submit"
              className="btn-primary !px-3 !py-1.5"
              title="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div
            className="px-3 py-1 border-t text-[9px] text-slate-500 text-center"
            style={{ background: 'rgba(251, 230, 194, 0.50)', borderColor: 'rgba(118,196,87,0.15)' }}
          >
            Queries outside system database will return &quot;Insufficient Information&quot;.
          </div>
        </div>
      )}

      {/* Toggle Action Pill Button — #2A7C13 glass pill with crisp typography and subtle inner glow */}
      <button
        id="btn-toggle-fra-mitra"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-trigger-pill"
        aria-label="Toggle FRA-MITRA AI Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#76C457] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#76C457]"></span>
        </span>
        <span className="text-xs font-bold tracking-wide text-white drop-shadow-xs">Ask FRA-MITRA</span>
        <MessageSquare className="w-3.5 h-3.5 text-white/95" />
      </button>
    </aside>
  );
};
