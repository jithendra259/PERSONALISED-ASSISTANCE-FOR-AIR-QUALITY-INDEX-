import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css"; 
import Headers from '../Header/header';

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    setChatHistory([...chatHistory, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt: message });
      const botMsg = {
        sender: "bot",
        text: res.data.response || "No response received.",
        time: new Date().toLocaleTimeString(),
      };

      setChatHistory((prevHistory) => [...prevHistory, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", text: "An error occurred. Please try again.", time: new Date().toLocaleTimeString() },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container">
      <Headers />
      <h3 className="text-center">Messaging</h3>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading"><h4>Recent</h4></div>
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
              {chatHistory.map((msg, index) =>
                msg.sender === "user" ? (
                  <div key={index} className="outgoing_msg">
                    <div className="sent_msg">
                      <p>{msg.text}</p>
                      <span className="time_date">{msg.time}</span>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="incoming_msg">
                    <div className="incoming_msg_img">
                      <img src="https://ptetutorials.com/images/user-profile.png" alt="bot" />
                    </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{msg.text}</p>
                        <span className="time_date">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="msg_send_btn" type="button" onClick={handleSend}>
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
