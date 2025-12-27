# 🤖 SaraGPT – Full Stack AI Chat Application

SaraGPT is a powerful and intelligent **full-stack AI chat application** built using **React**, **Node.js**, **Express**, and **MongoDB**.  
It provides real-time AI conversations using the **Perplexity AI API**, secure authentication, memory-based chat history, and a modern responsive UI.

---

## 🌐 Live Demo

- 🔗 **User Website**: https://sara-gpt.vercel.app  

---

## ✨ Features

### 👤 User Features
- 🔐 User Authentication & Authorization (JWT)
- 💬 Real-time AI chat responses (Streaming / Typing effect)
- 🧠 **Chat Memory Management** (store & retrieve conversations)
- 📜 Chat history with auto summarization
- ⚡ Fast and responsive UI
- 📱 Fully responsive design (mobile & desktop)

### 🛠 System Features
- 🧠 AI-powered responses using **Perplexity AI**
- 🔄 Streaming responses for real-time experience
- 💳 Token / credit-based usage system
- 🔐 Secure API endpoints
- 🌐 RESTful architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Context API
- Vite

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Perplexity AI API

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Perplexity AI API key

---

## 📥 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sunnymaurya719/SaraGPT.git
cd SaraGPT
```

2️⃣ **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3️⃣ **Environment Variables:**

Create a .env file inside the server folder:
   ```bash
   PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

PERPLEXITY_API_KEY=your_perplexity_api_key
   ```

4️⃣ **Run the application:**
```bash
For server : 
   npm run server
and
For client :
   npm run client
   ```

## 🗂️ Project Structure

```bash
SaraGPT/
│
├── client/                       # React frontend
│   ├── components/               # UI components
│   ├── pages/                    # Pages (Chat, Login, History)
│   ├── context/                  # Context API (Global state)
│   └── main.jsx
│
├── server/                       # Node.js backend
│   ├── controllers/              # Chat & auth logic
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API routes
│   ├── middleware/               # Auth & error handling
│   └── index.js
│
└── README.md

```
## 📦 Development Notes

⚡ Built with Vite for blazing-fast development

🔐 Secure authentication using JWT

🧠 AI chat memory stored in MongoDB

🌐 Clean REST API design

🧩 Scalable and maintainable folder structure
