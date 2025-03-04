# MERN Authentication Project

A full-stack authentication system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring secure user authentication and modern UI components.

## 🚀 Features

- User registration and login
- JWT (JSON Web Token) authentication
- Protected routes and endpoints
- Modern UI with Tailwind CSS
- Responsive design
- Toast notifications for user feedback
- Particle effects for enhanced UI experience

## 💻 Tech Stack

### Frontend

- React (v19)
- Redux Toolkit for state management
- React Router DOM for navigation
- Tailwind CSS for styling
- Vite as build tool
- React Toastify for notifications
- TSParticles for animations

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Cookie-parser for handling cookies
- Express Async Handler for error handling

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/rusirukalu/mern-auth.git
cd mern-auth
```

2. Install dependencies for both backend and frontend:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
NODE_ENV=development
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the development server:

```bash
# From the root directory
npm run dev
```

This will start both the backend server and frontend development server concurrently.

## 📁 Project Structure

```
mern-auth/
├── backend/              # Backend server code
│   └── server.js        # Entry point for the backend
├── frontend/            # Frontend React application
│   ├── src/
│   ├── public/
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🚦 Available Scripts

From the root directory:

- `npm run dev` - Runs both frontend and backend in development mode
- `npm run server` - Runs only the backend server
- `npm run client` - Runs only the frontend client
- `npm start` - Starts the production server

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- HTTP-only cookies for token storage
- Protected API endpoints
- Secure routing on frontend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 🔗 Contact

GitHub: [@rusirukalu](https://github.com/rusirukalu)

---

Made with ❤️ using the MERN stack
