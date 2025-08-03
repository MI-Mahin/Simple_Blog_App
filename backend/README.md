### **Backend Setup**

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn motor python-jose[cryptography] passlib[bcrypt] python-dotenv
   ```

3. **Create `.env` file**
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key_here
   ```

4. **Start the backend server**
   ```bash
   uvicorn main:app --reload
   ```
   Server will run on `http://localhost:8000`



