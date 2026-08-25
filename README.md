# 🛒 ShopSphere - Modern Full-Stack E-Commerce Platform

A production-grade, full-stack MERN e-commerce web application featuring role-based access control, responsive catalog navigation, live inventory management, and secure JWT authentication.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Material UI, Redux Toolkit, React Router DOM, Vite
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, Helmet, CORS
- **Authentication:** JSON Web Tokens (JWT), Bcrypt password hashing
- **Deployment:** Vercel (Client Edge Network), Render (API Web Service)

---

## ✨ Key Features

- 🔐 **Dual Role Authentication:** Seamless registration & login with role separation (Customer vs Admin).
- 🛍️ **Dynamic Product Catalog:** Multi-tier category navigation (Men, Women, Accessories) with instant keyword search.
- 🛒 **Real-Time Cart & Checkout:** Persistent Redux-powered cart workflow with address selection and order summaries.
- 📊 **Admin Dashboard:** Centralized analytics, product addition/updation, and order dispatch tracking via Material UI Data Tables.
- ⚡ **Modern UI Architecture:** Responsive Tailwind styling with dynamic announcement strips and interactive sliders.

---

## 🛠️ Local Setup

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/codebygauravs/ShopSphere-Ecommerce-.git
   cd ShopSphere-Ecommerce-
   \`\`\`

2. **Backend Setup:**
   \`\`\`bash
   cd backend
   npm install
   # Configure .env with MONGODB_URL and JWT_SECRET
   node src/server.js
   \`\`\`

3. **Frontend Setup:**
   \`\`\`bash
   cd ../frontend
   npm install
   npm run dev
   \`\`\`

---

## 👨‍💻 Author
- **Gaurav Saini** - [GitHub](https://github.com/codebygauravs)
