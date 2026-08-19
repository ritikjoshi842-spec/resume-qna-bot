import React from "react";
import { ArrowUp } from "lucide-react";
import "./ChatFooter.css";

function ChatFooter({ input, setInput, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <footer className="chat-footer">
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          placeholder="Ask a question regarding your resume or job description..."
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          className={`send-btn ${input.trim() ? "active" : ""}`}
          aria-label="Send message" 
          onClick={onSend}
          disabled={!input.trim()}
        >
          <ArrowUp size={18} strokeWidth={2.4} />
        </button>
      </div>
    </footer>
  );
}

export default ChatFooter;