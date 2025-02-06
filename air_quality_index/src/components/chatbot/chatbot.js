import React, { useState } from "react";
import axios from "axios";
import Header from "../Header/header";

function Chatbot() {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async () => {
        if (!query.trim()) return;

        setError(null);
        setResponse("");
        setLoading(true); // Set loading to true

        try {
            const res = await axios.post("http://localhost:5000/ask", { query });
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setResponse(res.data.response);
            }
        } catch (err) {
            setError("An error occurred while fetching the response.");
            console.error("Error details:", err);
        } finally {
            setLoading(false); // Set loading to false, regardless of success/failure
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Header />
            <h2>DeepSeek Chatbot</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask something..."
                style={{ width: "300px", padding: "10px" }}
            />
            <button
                onClick={handleSubmit}
                style={{ marginLeft: "10px", padding: "10px" }}
                disabled={loading} // Disable button while loading
            >
                {loading ? "Asking..." : "Ask"} {/* Show "Asking..." during loading */}
            </button>
            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd" }}>
                <strong>Response:</strong>
                {loading && <p>Loading...</p>} {/* Display loading message */}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p>{response}</p>
            </div>
        </div>
    );
}

export default Chatbot;