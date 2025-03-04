# 🚀 MERN Authentication Project

A robust, full-stack authentication system built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project showcases secure user authentication, protected routes, and a modern, responsive and enhanced UI.

🌐 **Live Demo:** https://mern-auth-sand.vercel.app -- (only the frontend)

## ✨ Features

- 🔐 Secure user registration and login
- 🎫 JWT (JSON Web Token) authentication
- 🛡️ Protected routes and API endpoints
- 🎨 Sleek UI with Tailwind CSS
- 📱 Fully responsive design
- 🍞 Toast notifications for user feedback
- 🔄 State management with Redux Toolkit
- 🚦 React Router for seamless navigation

## 🛠️ Tech Stack

### Frontend

- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS v4
- Vite
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- bcryptjs
- Cookie-parser
- Express Async Handler

## 📁 Project Structure

```
mern-auth/
├─ backend/              # Server-side code
│  ├─ config/            # Database configuration
│  ├─ controllers/       # Request handlers
│  ├─ middleware/        # Custom middleware
│  ├─ models/            # Database models
│  ├─ routes/            # API routes
│  ├─ utils/             # Utility functions
│  └─ server.js          # Main server file
├─ frontend/             # Client-side code
│  ├─ public/            # Static files
│  ├─ src/
│  │  ├─ assets/         # Images and icons
│  │  ├─ components/     # Reusable React components
│  │  ├─ screens/        # Main application screens
│  │  ├─ slices/         # Redux slices
│  │  ├─ App.jsx         # Main React component
│  │  └─ main.jsx        # Entry point
│  ├─ .env               # Frontend environment variables
│  └─ vite.config.js     # Vite configuration
├─ .env                  # Backend environment variables
└─ package.json          # Project dependencies and scripts
```

## 🚀 Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/rusirukalu/mern-auth.git
   cd mern-auth
   ```

2. Install dependencies:

   ```
   npm install
   cd frontend && npm install
   ```

3. Set up environment variables:
   Create `.env` in the root and frontend directories with necessary variables.

4. Run the development server:
   ```
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run server`: Run only the backend server
- `npm run client`: Run only the frontend client
- `npm start`: Start the production server

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- HTTP-only cookies for token storage
- Protected API endpoints and frontend routes

## 🌟 Key Components

- `userController.js`: Handles user-related operations (register, login, profile)
- `authMiddleware.js`: Protects routes and verifies JWT tokens
- `userModel.js`: Defines the MongoDB schema for users
- `generateToken.js`: Creates JWT tokens for authentication
- `PrivateRoute.jsx`: React component for protecting frontend routes
- `authSlice.js`: Manages authentication state with Redux Toolkit

## 🎨 UI/UX Highlights

- Responsive design works on desktop and mobile
- Toast notifications for clear user feedback
- Clean, modern UI with Tailwind CSS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Rusiru Kalu**

- GitHub: [@rusirukalu](https://github.com/rusirukalu)
- LinkedIn: [Rusiru Salwathura](https://www.linkedin.com/in/rusiru-salwathura-8a2b34303/)

## 🙏 Acknowledgments

- The MERN stack community for excellent documentation and resources
- Tailwind CSS for making styling a breeze
- Vercel for simplified deployment

---

Built with ❤️ using the MERN stack. Happy coding!
