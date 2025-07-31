🛠️ Product Ticket Generator
A full-stack application for managing product-related support tickets. Users can create tickets and communicate asynchronously with employees. Employees can view, respond, and resolve tickets based on skill set and assignment.

🌐 Live Demo
https://ticket-support-system-frontend.onrender.com

🔐 User Roles
User: Can register, log in, create tickets with product details, and chat with assigned employees.

Employee: Views assigned tickets, communicates with users, and provides solutions.

⚙️ Features
JWT-based Authentication & Role-based Authorization

Async communication using ticket feedback

User/Employee Dashboards

Ticket Creation, Listing, Filtering, and Detail View

Responsive frontend (React) with clean UI/UX

🧩 Tech Stack
Tech Area	Tools Used
Frontend	React.js, Axios, Bootstrap
Backend	Node.js, Express.js, JWT, Bcrypt
Database	MongoDB, Mongoose
DevOps	dotenv, nodemon, Postman
Authentication	JWT (Login/Signup with role selection)

🗂️ Project Structure
bash
Copy
Edit
server/
├── models/
├── routes/
├── server.js
├── .env
└── package.json

client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
└── package.json


📦 Setup Instructions

Clone the repo:
git clone https://github.com/yourusername/product-ticket-generator.git
cd product-ticket-generator

Install backend dependencies:
cd server
npm install

Install frontend dependencies:
cd ../client
npm install

Create a .env file inside server:
JWT_SECRET=yourSecretKey

Run backend:
npm start

Run frontend:
npm start
