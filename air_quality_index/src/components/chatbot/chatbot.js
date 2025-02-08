import React, { useState } from "react";
import axios from "axios";
import "./chatbot.css"; 
import Headers from '../Header/header';


function  Chatbot() {
  // State for the current message input and chat history
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to send a message and get a response from the DeepSeek API
  const handleSend = async () => {
    if (!message.trim()) return;

    // Create user message
    const userMsg = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString(),
    };

    // Add user message to chat history
    setChatHistory([...chatHistory, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      // POST to your DeepSeek FastAPI endpoint
      const res = await axios.post("http://localhost:5000/generate/", { prompt: message });
      const botMsg = {
        sender: "bot",
        text: res.data.response,
        time: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevHistory) => [...prevHistory, botMsg]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg = {
        sender: "bot",
        text: "An error occurred. Please try again.",
        time: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevHistory) => [...prevHistory, errorMsg]);
    }
    setLoading(false);
  };

  // Allow sending message by pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    
    <div className="container">
       
        <Headers/>
       
      <h3 className="text-center">Messaging</h3>
      <div className="messaging">
        <div className="inbox_msg">
          {/* Left Sidebar: Recent Chats */}
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input type="text" className="search-bar" placeholder="Search" />
                  <span className="input-group-addon">
                    <button type="button">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox_chat">
              {/* A few static chat entries for illustration */}
              <div className="chat_list active_chat">
                <div className="chat_people">
                  <div className="chat_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="profile" />
                  </div>
                  <div className="chat_ib">
                    <h5>
                      Sunil Rajput <span className="chat_date">Dec 25</span>
                    </h5>
                    <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                  </div>
                </div>
              </div>
              {/* Additional static chat entries can be added here */}
            </div>
          </div>
          {/* Right Side: Chat Conversation */}
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
