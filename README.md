# NodeJS-Notes-App
# Notes Application 📝

A full-stack web application for creating and managing personal notes with Google OAuth authentication.

## Features 🚀

- User authentication using Google OAuth 2.0
- Create, read, update, and delete notes
- Dashboard interface for note management
- Responsive design for all devices
- Secure data storage using MongoDB

## Tech Stack 💻

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0
- **View Engine**: EJS
- **Frontend**: HTML, CSS, JavaScript

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

## Contributing 🤝

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Submit a pull request

## 📧 Contact

- GitHub: [@vyshnavi-12](https://github.com/vyshnavi-12)
- LinkedIn: [@sri-vyshnavi-nakka](https://www.linkedin.com/in/sri-vyshnavi-nakka-38136428b/)
- Email: [srivyshnavinakka@gmail.com](mailto:srivyshnavinakka@gmail.com)

## Support 🙋‍♂️

If you have any questions or need help, please open an issue in the repository.

---
Made with ❤️ by Sri Vyshnavi
