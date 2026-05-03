## 🧠 Student Counseling & Mental Health Support Portal

A full-stack MERN web application developed to provide students with accessible, confidential, and structured mental health support. The platform allows students to connect with counselors, book appointments, access wellness resources, and communicate securely through a modern digital counseling system.

---

## 🌐 Live Features

The system supports three major user roles:

- 👨‍🎓 Students
- 🧑‍⚕️ Counselors
- 🛠️ Administrators

---

## 📌 Project Overview

Mental health and emotional well-being are critical for students’ academic performance and personal growth. Many students hesitate to seek support due to stigma, accessibility issues, or lack of proper communication channels.

This platform addresses those challenges by providing:

- Secure online counseling appointments
- Anonymous support messaging
- Mental health educational resources
- Real-time communication features
- Administrative management tools

The system is designed for universities, institutes, and educational organizations seeking a centralized counseling solution.

---

## 🚀 Key Features

### 👨‍🎓 Student Module

- Student registration & login
- JWT-based authentication
- Profile management with image upload
- Browse available counselors
- Book counseling appointments
- Appointment status tracking
- Anonymous messaging support
- Access mental health resources
- Contact support system
- Emergency contact information
- Responsive dashboard UI

---

### 🧑‍⚕️ Counselor Module

- Counselor login & authentication
- Profile customization
- Manage appointments
- Approve/reject counseling requests
- Update appointment statuses
- View student appointment history
- Anonymous student communication
- Mental health resource management

---

### 🛠️ Admin Module

- Admin dashboard with analytics
- Manage students
- Manage counselors
- Appointment monitoring
- Message management
- Contact inquiry management
- Resource management
- Statistics & charts
- System overview dashboard

---
## 🖼️ System Screenshots

### 🏠 Landing Page

<img width="1903" height="901" alt="Screenshot 2026-05-03 111327" src="https://github.com/user-attachments/assets/1628a88a-ee36-4243-a93b-902186b3ac41" />

- Modern and fully responsive homepage design
- Dynamic counselor showcase section
- Mental health service overview cards
- Mental wellness awareness sections
- Responsive navigation bar with authentication
- Smooth animations and modern UI components

---

## 💬 Anonymous Support Chat

<img width="1911" height="897" alt="Screenshot 2026-05-03 122527" src="https://github.com/user-attachments/assets/58a1cc07-1a0a-4350-9bab-3406387c70f8" />

- Secure anonymous messaging system
- Student-to-counselor communication
- Real-time style chat interface
- Private and confidential support environment
- Message management dashboard for admin

---

## 📊 Admin Dashboard

<img width="1907" height="909" alt="Screenshot 2026-05-03 120926" src="https://github.com/user-attachments/assets/0eee0686-1d39-4793-8ff2-a8b160bccf27" />

- Interactive analytics dashboard using Recharts
- Monthly appointment statistics visualization
- Service distribution pie charts
- Appointment overview progress analytics
- Recent appointments monitoring table
- Student and counselor management panels
- Contact message management system
- Responsive admin dashboard UI

---

## 📚 Mental Health Resources

<img width="1913" height="788" alt="Screenshot 2026-05-03 120850" src="https://github.com/user-attachments/assets/51b7418f-47b3-4927-9d89-82586c14e421" />

- Resource sharing platform
- Articles, videos, and guides support
- Resource management system for admin
- Educational mental health content access

---

## 🏗️ System Architecture

The application follows a client-server architecture.

```text
Frontend (React.js)
        ↓
REST API (Express.js / Node.js)
        ↓
MongoDB Database
```

---

## 🧰 Technology Stack

### 🎨 Frontend

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify
- SweetAlert2
- Recharts
- React Icons
- Lucide React

---

### ⚙️ Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- dotenv

---

### 🛠️ Development Tools

- Git & GitHub
- Postman
- VS Code
- MongoDB Compass

---

## 📁 Project Structure

```bash
Student-Counseling-System/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- MongoDB Atlas
- Git

---

## 🔹 Clone Repository

```bash
git clone https://github.com/Akila-Prabath/Student-Counseling-System.git
```

```bash
cd Student-Counseling-System
```

---

## 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8070
```

Start backend server:

```bash
npm start
```

---

## 🔹 Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

Backend runs on:

```bash
http://localhost:8070
```

---

## 🔐 Security Features

- Password hashing using bcrypt
- JWT authentication & authorization
- Protected routes & middleware
- Secure environment variables
- Anonymous support messaging
- File upload validation using Multer

---

## 📊 Dashboard & Analytics

The admin dashboard includes:

- Monthly appointment analytics
- Appointment status overview
- Service distribution pie charts
- Recent appointment tables
- Real-time dashboard statistics

---

## 📂 API Highlights

### Authentication APIs

- Register
- Login
- Change Password

### User APIs

- Get counselors
- Get students
- Update profiles
- Delete users

### Appointment APIs

- Create appointments
- Update appointment status
- Delete appointments

### Resource APIs

- Add resources
- Delete resources
- View resources

---

## 🌱 Future Enhancements

- 🔴 Real-time chat using Socket.io
- 🤖 AI-powered mental health recommendations
- 📧 Email notifications & reminders
- 📱 Mobile application
- 📹 Video counseling sessions
- 🌐 Multi-language support
- 📈 Advanced analytics & reports

---

## 👨‍💻 Author

Akila Prabath  
Software Engineering Undergraduate

GitHub: https://github.com/Akila-Prabath

---

## 📄 License

This project was developed for educational and academic purposes.

All rights reserved.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
