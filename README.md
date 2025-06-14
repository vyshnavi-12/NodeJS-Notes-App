# NodeJS-Notes-App📝
A full-stack web application for creating and managing personal notes with Google OAuth authentication.

## 🌐 Live Demo
**[Try the app here: https://notes-backend-ru3b.onrender.com/](https://notes-backend-ru3b.onrender.com/)**

## Features 🚀
- User authentication using Google OAuth 2.0
- Create, read, update, and delete notes
- Dashboard interface for note management
- AI-powered chatbot using Gemini API for assistance
- Responsive design for all devices
- Secure data storage using MongoDB

## Tech Stack 💻
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0
- **AI Integration**: Google Gemini API
- **View Engine**: EJS
- **Frontend**: EJS Templates, JavaScript

## Project Structure 📁
```
├── public/
│   ├── css/
│   └── img/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
├── views/
│   ├── dashboard/
│   ├── layouts/
│   └── partials/
└── .env
```

## Prerequisites 📋
- Node.js (v14 or higher)
- MongoDB Account
- Google Cloud Console Account

## Environment Variables Setup 🔐
Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/google/callback
GEMINI_API_KEY=your_gemini_api_key
```

### How to obtain the environment variables:
1. **MongoDB URI:**
   - Create a free account on [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Click "Connect" and choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password

2. **Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Google+ API
   - Go to Credentials → Create Credentials → OAuth Client ID
   - Choose Web Application
   - Add authorized redirect URIs (e.g., http://localhost:5001/google/callback)
   - Copy the generated Client ID and Client Secret

3. **Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated API key

## Installation & Setup 🛠️
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notes-application.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables as described above

4. Start the application:
   ```bash
   npm start
   ```

5. Visit `http://localhost:5001` in your browser

## 📧 Contact
- GitHub: [@vyshnavi-12](https://github.com/vyshnavi-12)
- LinkedIn: [@sri-vyshnavi-nakka](https://www.linkedin.com/in/sri-vyshnavi-nakka-38136428b/)
- Email: [srivyshnavinakka@gmail.com](mailto:srivyshnavinakka@gmail.com)
