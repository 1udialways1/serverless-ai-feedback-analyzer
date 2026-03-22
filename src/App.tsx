import axios from "axios";
import { useEffect, useState } from "react";

import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./firebase";
import Login from "./Login";
import Signup from "./Signup";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ✅ NETLIFY FUNCTION URL
const API_URL = "/.netlify/functions/analyze";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [page, setPage] = useState<"login" | "signup">("login");

  const [feedback, setFeedback] = useState("");
  const [reply, setReply] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingAuth(false);
    });

    return () => unsub();
  }, []);

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🤖 ANALYZE (SERVERLESS)
  const analyzeFeedback = async () => {
    if (!feedback.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post(API_URL, { feedback });

      const aiReply = res.data.reply || "No reply";
      const aiSentiment = res.data.sentiment || "Neutral";

      setReply(aiReply);
      setSentiment(aiSentiment);

      // Update chart data
      setHistory((prev) => [
        {
          sentiment: aiSentiment,
        },
        ...prev,
      ]);

      setFeedback("");
    } catch (err) {
      console.error(err);
      setReply("❌ Failed to analyze");
      setSentiment("Neutral");
    }

    setLoading(false);
  };

  // 📊 CHART DATA
  const chartData = [
    {
      name: "Positive",
      value: history.filter((h) => h.sentiment === "Positive").length,
    },
    {
      name: "Negative",
      value: history.filter((h) => h.sentiment === "Negative").length,
    },
    {
      name: "Neutral",
      value: history.filter((h) => h.sentiment === "Neutral").length,
    },
  ];

  if (loadingAuth) return <h2 style={{ color: "white" }}>Loading...</h2>;

  if (!user) {
    return page === "login" ? (
      <Login goToSignup={() => setPage("signup")} />
    ) : (
      <Signup onLogin={() => setPage("login")} />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        padding: "40px",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Welcome, {user.displayName}</h2>
          <p style={{ fontSize: "12px", opacity: 0.7 }}>{user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CARD */}
      <div
        style={{
          marginTop: "40px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>💬 AI Feedback Analyzer</h1>

        {/* INPUT */}
        <textarea
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback..."
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "none",
            marginTop: "20px",
          }}
        />

        <button
          onClick={analyzeFeedback}
          style={{
            marginTop: "15px",
            padding: "12px 25px",
            borderRadius: "12px",
            background: "#38bdf8",
            border: "none",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* RESULT */}
        <div style={{ marginTop: "25px" }}>
          <h3>🤖 AI Reply</h3>
          <p>{reply}</p>

          <h3>
            📊 Sentiment:{" "}
            <span
              style={{
                color:
                  sentiment === "Positive"
                    ? "#22c55e"
                    : sentiment === "Negative"
                    ? "#ef4444"
                    : "#94a3b8",
              }}
            >
              {sentiment}
            </span>
          </h3>
        </div>

        {/* 📊 CHART */}
        <h3 style={{ marginTop: "30px" }}>📊 Analytics</h3>

        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="value" fill="#38bdf8" />
        </BarChart>
      </div>
    </div>
  );
}

export default App;