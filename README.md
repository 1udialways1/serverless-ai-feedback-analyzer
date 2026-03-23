# 🚀 Serverless AI Feedback Analyzer

An AI-powered feedback analysis system built using **AWS Lambda (Serverless Architecture)** and **MongoDB Atlas**.
This application processes user feedback, performs sentiment analysis, and stores results for scalable insights.

---

## ✨ Features

* 🤖 AI-based sentiment analysis (Positive / Negative / Neutral)
* ☁️ Serverless backend using AWS Lambda
* 🌐 API handling via AWS API Gateway
* 🗄️ MongoDB Atlas for data storage
* ⚡ Fast, scalable, and cost-efficient architecture
* 🔐 Secure API key & environment variable management

---

## 🏗️ Tech Stack

* **Backend:** Node.js (AWS Lambda)
* **Cloud:** AWS Lambda + API Gateway
* **Database:** MongoDB Atlas
* **AI Integration:** Gemini API / LLM
* **Environment Management:** dotenv

---

## 📁 Project Structure

```
serverless-ai-feedback-analyzer/
│
├── functions/              # AWS Lambda functions
│   ├── analyze.js          # AI sentiment analysis
│   └── saveFeedback.js     # Store feedback in MongoDB
│
├── config/                 # Database connection
├── models/                 # MongoDB schemas
├── utils/                  # Helper functions
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/1udialways1/serverless-ai-feedback-analyzer.git
cd serverless-ai-feedback-analyzer
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in root:

```
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_api_key
```

---

## 🚀 Running Locally

You can test functions locally using:

* Serverless Framework
* AWS SAM CLI

Example:

```
npm run dev
```

---

## ☁️ Deployment (AWS Lambda)

1. Create AWS Lambda functions
2. Connect with API Gateway
3. Add environment variables in AWS
4. Deploy functions

---

## 📡 API Endpoints

### 🔹 Analyze Feedback

```
POST /analyze
```

### 🔹 Save Feedback

```
POST /save-feedback
```

---

## 🔐 Security

* `.env` is ignored using `.gitignore`
* API keys are not exposed in the repository
* Environment variables are used in production

---

## 📈 Future Improvements

* 📊 Admin dashboard with analytics
* 🔐 User authentication system
* 📧 Email notifications after feedback submission
* 📉 Sentiment trends visualization

---

## 👨‍💻 Author

**Uddipan Mondal**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

