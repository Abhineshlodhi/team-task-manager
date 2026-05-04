# 🚀 Team Task Manager

A production-ready full-stack Team Task Manager web application. This application allows users to create projects, assign tasks to team members, track progress through a dynamic Kanban board, and view at-a-glance analytics via a dashboard.

---

## 🧱 Tech Stack

### Backend
- **Python 3.10+**
- **Django 4.2+** (High-level Python web framework)
- **Django REST Framework (DRF)** (For building secure RESTful APIs)
- **djangorestframework-simplejwt** (For JWT Authentication)
- **MySQL** (Primary Database)
- **WhiteNoise** (For serving static files in production)

### Frontend
- **React.js 18+** (UI Library)
- **Vite** (Next Generation Frontend Tooling)
- **Tailwind CSS v4** (Utility-first CSS framework)
- **React Router Dom v6** (For seamless page routing)
- **Axios** (For making API requests with JWT interceptors)

### Deployment
- **Railway.app** (Automated deployment for full-stack monorepos)

---

## ✨ Features

- **Authentication:** Secure Login/Registration using JSON Web Tokens (JWT).
- **Role-Based Access Control (RBAC):**
  - **Admin:** Has full control. Can create projects, add/remove members, and create tasks.
  - **Member:** Can only view projects they are assigned to, and can update the status of tasks on the Kanban board.
- **Project Management:** Admins can create isolated projects and assign multiple users to them.
- **Kanban Task Board:** Tasks can be dragged or dropdown-selected between `Todo`, `In Progress`, and `Completed` columns.
- **Dashboard Analytics:** Displays a dynamic overview of total tasks, completed tasks, and pending tasks tailored to the logged-in user.
- **Modern UI/UX:** Built with Tailwind CSS, featuring a responsive, clean, and interactive design.

---

## 📂 Folder Structure

This project follows a **Monorepo** structure, meaning both the backend and frontend exist within the same repository.

```text
/task-manager
│── /backend                 # Django API
│   ├── /core                # Main Django settings, urls, wsgi
│   ├── /apps
│   │   ├── /users           # Custom User model and Auth APIs
│   │   └── /projects        # Project/Task models and Business logic APIs
│   ├── manage.py            # Django execution script
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Database and environment variables
│
│── /frontend                # React SPA
│   ├── /public              # Static public assets
│   ├── /src                 
│   │   ├── /components      # Reusable UI components (TaskBoard, etc.)
│   │   ├── /context         # React Context (AuthContext for global state)
│   │   ├── /pages           # App screens (Login, Dashboard, ProjectList, etc.)
│   │   ├── /services        # Axios configuration with JWT interceptors
│   │   ├── App.jsx          # Main App routing
│   │   └── index.css        # Tailwind v4 theme and styles
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
│
└── README.md                # Project documentation
```

---

## 🛠️ Step-by-Step Local Setup Instructions

Follow these exact steps to run the application on your local machine.

### 1. Prerequisites
Before you begin, ensure you have the following installed:
- [Python (3.10 or higher)](https://www.python.org/downloads/)
- [Node.js (18 or higher)](https://nodejs.org/en/download/)
- MySQL Server (or XAMPP/WAMP if preferred). Note: The app defaults to SQLite if MySQL is not configured.

---

### 2. Backend Setup (Django)

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment:**
   This isolates the Python dependencies from your global system.
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment:**
   - **Windows:**
     ```bash
     .\venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install Python Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure the Database (`.env` file):**
   By default, the backend will use SQLite. If you want to use MySQL, create a `.env` file in the `/backend` folder with your credentials:
   ```env
   DATABASE_NAME=ethara
   DATABASE_USER=root
   DATABASE_PASSWORD=your_mysql_password
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   ```

6. **Apply Database Migrations:**
   This creates the tables in your database.
   ```bash
   python manage.py makemigrations users projects
   python manage.py migrate
   ```

7. **Create an Admin User:**
   You need an Admin account to access the Django Admin Panel and create your first projects.
   ```bash
   python manage.py createsuperuser
   ```
   *(Follow the prompts to enter an email and password)*

8. **Start the Django Development Server:**
   ```bash
   python manage.py runserver
   ```
   The backend API is now running at `http://127.0.0.1:8000/`. Keep this terminal window open.

---

### 3. Frontend Setup (React + Vite)

1. **Open a New Terminal Window** (Leave the backend running).

2. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

3. **Install Node Dependencies:**
   This will install React, Tailwind CSS, Axios, and all other required packages.
   ```bash
   npm install
   ```

4. **Start the Vite Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173/`).
   
6. **Log In:**
   Use the Admin credentials you created in step 7 of the backend setup to log in and start using the app!

*(Optional Data Entry: To add your first projects and members, visit `http://127.0.0.1:8000/admin` in your browser and log in with your Admin account).*

---

## 🌐 Railway Deployment Guide

This project is fully optimized to be deployed as a Monorepo on [Railway.app](https://railway.app).

### Step 1: Push to GitHub
Commit all your code and push it to a new GitHub repository.

### Step 2: Create a Railway Account
Sign up at [Railway.app](https://railway.app) and connect your GitHub account.

### Step 3: Deploy the MySQL Database
1. Click **"New Project"** -> **"Add a Plugin"** -> **"MySQL"**.
2. Railway will automatically provision a database for you.

### Step 4: Deploy the Django Backend
1. In the same Railway project, click **"New"** -> **"GitHub Repo"** -> Select your repository.
2. Go to the newly created service's **Settings**.
3. Under **Build**, change the **Root Directory** to `/backend`.
4. Go to the **Variables** tab and add the following Environment Variables:
   - `DATABASE_URL` (Click "Add Reference" and select the URL from the MySQL plugin)
   - `SECRET_KEY` (Generate a random string)
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = `*`
5. Go to the **Settings** tab again. Under **Deploy**, set the **Custom Start Command**:
   ```bash
   gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
   ```
6. Railway will automatically detect the `requirements.txt` and deploy your Django API. Generate a public domain for this service in the Settings tab.

### Step 5: Deploy the React Frontend
1. Click **"New"** -> **"GitHub Repo"** -> Select the *same* repository again.
2. Go to this second service's **Settings**.
3. Under **Build**, change the **Root Directory** to `/frontend`.
4. Go to the **Variables** tab and add:
   - `VITE_API_BASE_URL` = `https://your-backend-railway-domain.up.railway.app/api`
5. Railway will automatically detect the `package.json`, build the Vite app, and serve it.
6. Generate a public domain for the frontend service in the Settings tab.

**Congratulations! Your full-stack app is now live!**

---

## 📚 API Endpoints Documentation

The backend exposes the following RESTful endpoints. All endpoints (except Auth) require a Bearer token in the `Authorization` header.

### Authentication & Users
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Obtain JWT access and refresh tokens
- `POST /api/auth/refresh/` - Refresh the JWT access token
- `GET /api/auth/me/` - Retrieve the currently logged-in user profile
- `GET /api/auth/users/` - List all users (Requires Authentication)

### Projects
- `GET /api/projects/` - List all projects associated with the logged-in user
- `POST /api/projects/` - Create a new project (Admin Only)
- `GET /api/projects/{id}/` - Retrieve details of a specific project
- `PUT /api/projects/{id}/` - Update a project (Admin Only)
- `DELETE /api/projects/{id}/` - Delete a project (Admin Only)

### Project Members
- `POST /api/projects/{id}/members/` - Add a user to a project (Admin Only)
- `DELETE /api/projects/{id}/members/{user_id}/` - Remove a user from a project (Admin Only)

### Tasks
- `GET /api/tasks/` - List tasks assigned to the user (or all tasks managed by the Admin)
- `POST /api/tasks/` - Create a new task (Admin Only)
- `PATCH /api/tasks/{id}/` - Partially update a task status (e.g., move from Todo to In Progress)
- `DELETE /api/tasks/{id}/` - Delete a task (Admin Only)

### Dashboard Analytics
- `GET /api/dashboard/stats/` - Retrieve total, pending, and completed task counts for the logged-in user.
