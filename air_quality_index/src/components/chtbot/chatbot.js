import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";

function DeepSeek() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return; // Do nothing if the prompt is empty

    setLoading(true);
    try {
      // Make sure the URL matches your FastAPI endpoint address
      const res = await axios.post("http://localhost:8000/generate/", { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <h1>DeepSeek Chatbot</h1>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows="4"
          cols="50"
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <br />
        <button onClick={handleSubmit} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
          {loading ? "Generating..." : "Generate Response"}
        </button>
        {response && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeepSeek;
