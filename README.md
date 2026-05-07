<div align="center">

# ⚡ TaskFlow — Team Task Manager

**A full-stack project management platform built for modern teams.**  
Kanban-style task boards, role-based access, JWT authentication, and real-time progress tracking.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge)](https://team-task-manager-sigma-henna.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚙️_Backend_API-Railway-purple?style=for-the-badge)](https://team-task-manager-production-b22d.up.railway.app/api/)
[![Admin Panel](https://img.shields.io/badge/🔐_Admin_Panel-Django-green?style=for-the-badge)](https://team-task-manager-production-b22d.up.railway.app/admin/)
[![GitHub](https://img.shields.io/badge/📦_Source_Code-GitHub-gray?style=for-the-badge)](https://github.com/Abhineshlodhi/team-task-manager)

</div>

---

## 🚀 Live Deployment

| Service | URL | Platform |
|---------|-----|----------|
| 🌐 Frontend | https://team-task-manager-sigma-henna.vercel.app/ | Vercel |
| ⚙️ Backend API | https://team-task-manager-production-b22d.up.railway.app/api/ | Railway |
| 🔐 Admin Panel | https://team-task-manager-production-b22d.up.railway.app/admin/ | Railway |
| 🗄️ Database | PostgreSQL | Railway |

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Local Development Setup](#-local-development-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment Guide](#-deployment-guide)
- [Screenshots](#-screenshots)

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login with access + refresh tokens
- 👥 **Role-Based Access** — Admin and Member roles with separate permissions
- 📋 **Kanban Task Boards** — Visual task management with Todo / In Progress / Done columns
- 📊 **Dashboard Stats** — Total tasks, completed, and pending counts at a glance
- 🏗️ **Project Management** — Create and manage multiple projects with team members
- 🎨 **Beautiful Landing Page** — Dark-themed, animated landing page with feature showcase
- 📱 **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast API** — Django REST Framework with no pagination for instant data loading

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Python 3.13 | Core language |
| Django 4.2 | Web framework |
| Django REST Framework | API layer |
| djangorestframework-simplejwt | JWT authentication |
| django-cors-headers | Cross-origin request handling |
| psycopg2-binary | PostgreSQL driver |
| gunicorn | Production WSGI server |
| whitenoise | Static file serving |
| dj-database-url | Database URL parsing |
| python-dotenv | Environment variable loading |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS v4 | Utility-first styling |
| Context API | Global state management |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Railway | Backend + PostgreSQL database hosting |
| Vercel | Frontend hosting + CDN |
| GitHub | Source control + CI/CD trigger |

---

## 📁 Project Structure

```
task-manager/
├── backend/                    # Django REST API
│   ├── core/                   # Project settings & URLs
│   │   ├── settings.py         # Main settings (env-based config)
│   │   ├── urls.py             # Root URL configuration
│   │   └── wsgi.py             # WSGI application entry point
│   ├── users/                  # Custom user authentication app
│   │   ├── models.py           # Custom User model (email-based)
│   │   ├── serializers.py      # User & Registration serializers
│   │   ├── views.py            # Register, Login, User detail views
│   │   ├── urls.py             # Auth URL patterns
│   │   └── admin.py            # Admin panel configuration
│   ├── projects/               # Projects & Tasks app
│   │   ├── models.py           # Project, ProjectMember, Task models
│   │   ├── serializers.py      # Project & Task serializers
│   │   ├── views.py            # Project & Task CRUD views
│   │   ├── urls.py             # Project URL patterns
│   │   └── admin.py            # Admin panel configuration
│   ├── .env                    # ⚠️ Local secrets (NOT in git)
│   ├── .env.example            # ✅ Template for environment variables
│   ├── requirements.txt        # Python dependencies
│   └── manage.py               # Django management script
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx     # Public landing page
│   │   │   ├── Login.jsx       # Authentication page
│   │   │   ├── Dashboard.jsx   # Main dashboard with stats
│   │   │   ├── ProjectList.jsx # All projects view
│   │   │   └── ProjectDetail.jsx # Kanban board for a project
│   │   ├── components/
│   │   │   └── TaskBoard.jsx   # Kanban board component
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state (JWT management)
│   │   ├── services/
│   │   │   └── api.js          # Axios instance with JWT interceptors
│   │   ├── App.jsx             # Root component with routing
│   │   └── main.jsx            # React entry point
│   ├── .env                    # ⚠️ Local env (NOT in git)
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite configuration
│
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 💻 Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL or PostgreSQL running locally
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Abhineshlodhi/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your environment file
cp .env.example .env
# Edit .env with your local database credentials (see below)

# Run database migrations
python manage.py migrate

# Create a superuser (admin account)
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

Backend will be running at: `http://127.0.0.1:8000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create your environment file
echo "VITE_API_BASE_URL=http://127.0.0.1:8000/api" > .env

# Start the development server
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
# Django
SECRET_KEY=your-random-secret-key-here
DEBUG=True

# Database (MySQL for local, auto-detected on Railway)
DATABASE_NAME=taskmanager_db
DATABASE_USER=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

> ℹ️ Copy `backend/.env.example` to `backend/.env` and fill in your values.  
> ⚠️ **Never commit the `.env` file to Git!**

### Frontend (`frontend/.env`)

```env
# Local Development
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# Production (Vercel)
VITE_API_BASE_URL=https://team-task-manager-production-b22d.up.railway.app/api
```

---

## 📡 API Reference

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|:---:|
| `POST` | `/api/auth/login/` | Login and get JWT tokens | ❌ |
| `POST` | `/api/auth/register/` | Register a new user | ❌ |
| `POST` | `/api/auth/token/refresh/` | Refresh access token | ❌ |
| `GET` | `/api/auth/me/` | Get current user info | ✅ |

### Projects Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|:---:|
| `GET` | `/api/projects/` | List all projects | ✅ |
| `POST` | `/api/projects/` | Create a new project | ✅ Admin |
| `GET` | `/api/projects/:id/` | Get project details | ✅ |
| `PUT` | `/api/projects/:id/` | Update a project | ✅ Admin |
| `DELETE` | `/api/projects/:id/` | Delete a project | ✅ Admin |

### Tasks Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|:---:|
| `GET` | `/api/projects/:id/tasks/` | List tasks for a project | ✅ |
| `POST` | `/api/projects/:id/tasks/` | Create a task | ✅ |
| `PATCH` | `/api/tasks/:id/` | Update task status | ✅ |
| `DELETE` | `/api/tasks/:id/` | Delete a task | ✅ Admin |

### Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|---------|-------------|:---:|
| `GET` | `/api/dashboard/stats/` | Get task statistics | ✅ |

---

## 🚀 Deployment Guide

### Backend → Railway

1. Push your code to GitHub.
2. Go to [railway.app](https://railway.app) and create a new project.
3. Click **New** → **Database** → **Add PostgreSQL**.
4. Click **New** → **GitHub Repo** → select `team-task-manager`.
5. In **Settings** → **Source**, set **Root Directory** to `backend`.
6. In **Settings** → **Deploy**, set the **Start Command**:
   ```bash
   python manage.py collectstatic --noinput && python manage.py migrate && gunicorn core.wsgi:application --bind 0.0.0.0:$PORT
   ```
7. In **Variables** tab, add:
   ```
   SECRET_KEY     = <random-string>
   DEBUG          = False
   ALLOWED_HOSTS  = *
   DATABASE_URL   = <paste POSTGRES_URL from your PostgreSQL service>
   ```
8. In **Settings** → **Networking**, click **Generate Domain**.

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your `team-task-manager` GitHub repository.
3. Set **Root Directory** to `frontend`.
4. Add **Environment Variable**:
   ```
   VITE_API_BASE_URL = https://your-railway-domain.up.railway.app/api
   ```
5. Click **Deploy**.

---

## 🔄 Updating Production

After making changes locally:

```bash
git add .
git commit -m "Your update message"
git push
```

Both Railway (backend) and Vercel (frontend) will automatically detect the new commit and redeploy within minutes.

---

## 👤 Default Credentials (Local)

After running `createsuperuser`, use the credentials you set.  
In production, the admin account is created via the Railway start command.

| Field | Value |
|-------|-------|
| Email | admin@admin.com |
| Password | (set during createsuperuser) |
| Role | Admin |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ using **Django** + **React** + **Railway** + **Vercel**

[🌐 Live Demo](https://team-task-manager-sigma-henna.vercel.app/) · [⚙️ API](https://team-task-manager-production-b22d.up.railway.app/api/) · [📦 GitHub](https://github.com/Abhineshlodhi/team-task-manager)

</div>
