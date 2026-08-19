import { useState, useRef, useEffect } from 'react';
import './App.css';
import Attachment from './Attachment.jsx';
import ChatFooter from './ChatFooter.jsx';
import { sendChatMessage } from './api.js';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Store uploaded files
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageText = input.trim();
    setInput('');

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    // Append user message & placeholder for streaming assistant response
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessageText },
      { sender: 'assistant', text: '' }
    ]);
    setIsLoading(true);

    try {
      // Send question + uploaded files to FastAPI and handle streamed chunks
      await sendChatMessage(
        userMessageText,
        resume,
        jobDescription,
        (chunk) => {
          setMessages((prev) => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (lastIndex >= 0 && updated[lastIndex].sender === 'assistant') {
              updated[lastIndex] = {
                ...updated[lastIndex],
                text: updated[lastIndex].text + chunk
              };
            }
            return updated;
          });
        }
      );

    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex].sender === 'assistant') {
          if (!updated[lastIndex].text) {
            updated[lastIndex] = {
              sender: 'assistant',
              text: 'Sorry, something went wrong. Please try again.'
            };
          }
        }
        return updated;
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Background ambient lighting */}
      <div className="ambient-glow glow-top" />
      <div className="ambient-glow glow-bottom" />

      {/* Top Left Attachment Controller */}
      <Attachment
        setResume={setResume}
        setJobDescription={setJobDescription}
      />

      {/* Header / Hero Welcome Area */}
      <div className={`welcome-container ${hasInteracted ? 'fade-out' : ''}`}>
        
        {/* Modern AI Abstract Brand Icon */}
        <div className="chatbot-logo-badge">
          <div className="logo-halo" />
          <svg className="chatbot-logo-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" stroke="url(#neon-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="16" cy="16" r="4" fill="url(#neon-grad)" />
            <path d="M16 7V12M16 20V25M8 11.5L12.5 14M19.5 18L24 20.5M24 11.5L19.5 14M12.5 18L8 20.5" stroke="url(#neon-grad)" strokeWidth="1.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="neon-grad" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="heading">
          <h1>
            Hello, Welcome to your own <span className="highlight">Chatbot</span>
          </h1>
        </div>

        <div className="subheading">
          <p>
            Please attach your resume and job description to get started with intelligent analysis.
          </p>
        </div>

      </div>

      {/* Main Conversation Area */}
      <main className={`chat-conversation-area ${hasInteracted ? 'active' : ''}`}>
        <div className="messages-list">
          {messages.map((msg, index) => {
            const isLastMessage = index === messages.length - 1;
            const isAssistant = msg.sender === 'assistant';
            const isStreaming = isAssistant && isLastMessage && isLoading;

            return (
              <div
                key={index}
                className={`message-row ${msg.sender}`}
              >
                {isAssistant && (
                  <div className="assistant-avatar">
                    <span className="avatar-dot" />
                  </div>
                )}

                {isAssistant && !msg.text && isLoading ? (
                  <div className="message-bubble loading-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                ) : (
                  <div className="message-bubble">
                    {msg.text}
                    {isStreaming && <span className="typing-cursor" />}
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Chat Footer */}
      <ChatFooter
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

export default App;