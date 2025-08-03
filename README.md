#  Simple Blog App 

## 01. Introduction
This documentation outlines the steps to develop a simple blog post web application with user authentication. The backend is built using FastAPI (Python), the frontend uses React.js, and MongoDB is used for the database.

## 02. Tech Stack
- **Backend**: FastAPI
- **Frontend**: React.js
- **Database**: MongoDB

## 03. Backend (FastAPI)
- **Authentication**: JWT-based authentication (signup/login/logout).
- **Routes**:
  - `POST /signup`: Register new user.
  - `POST /login`: Authenticate user and return JWT.
  - `GET /posts`: Return all posts (authentication required).
  - `POST /posts`: Create a new blog post (authentication required).
- **Models**:
  - `User`: Username, Email, Password (hashed).
  - `Post`: Title, Body, Author (reference to User).
- **Dependencies**: fastapi, motor (async MongoDB driver), passlib, python-jose.

## 04. Frontend (React.js)
- **Pages**:
  - `/login`: User login page.
  - `/signup`: User registration page.
  - `/posts`: Show all blog posts.
  - `/create`: Create a new blog post.
- **Features**:
  - Token storage in localStorage.
  - Protected routes.
  - Axios for HTTP requests.

## 05. MongoDB Configuration
- Use MongoDB Atlas.
- Collections:
  - `users`: Stores user information.
  - `posts`: Stores blog post content.

## 06. Running the Application
1. **Backend**:
   - Install dependencies using `pip install -r requirements.txt`.
   - Run the server: `uvicorn main:app --reload`.

2. **Frontend**:
   - Install dependencies: `npm install`.
   - Run the dev server: `npm start`.

## 07. Security Tips
- Always hash passwords before storing.
- Use HTTPS in production.
- Store JWT secret securely.
- Set appropriate CORS headers.

## 08. Project Structure

```
Simple_Blog_App/
│
├── backend/
│   ├── main.py                  
│   ├── auth.py                 
│   ├── models.py                
│   ├── database.py              
│   ├── routes/
│   │   ├── auth_routes.py       
│   │   └── post_routes.py      
│   ├── .env                     
│   └── requirements.txt         
│
├── frontend/
│   ├── src/
│   │   ├── api.js              
│   │   ├── index.js            
│   │   ├── App.js              
│   │   ├── pages/
│   │   │   ├── Signup.js
│   │   │   ├── Login.js
│   │   │   ├── Posts.js
│   │   │   └── CreatePost.js
│   │   ├── components/
│   │   │   └── ProtectedRoute.js
│   │   └── index.css           
│   │       
│   └── package.json
```

## 09. License

This project is licensed under the MIT License.

---

> Developed as an internship project by **Mahmudul Islam Mahin**
