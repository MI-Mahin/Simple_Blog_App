from fastapi import APIRouter, HTTPException, status, Depends
from models import User, UserLogin
from auth import hash_password, verify_password, create_access_token
from database import db

router = APIRouter()

@router.post("/signup")
async def signup(user: User):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user.password = hash_password(user.password)
    await db.users.insert_one(user.dict())
    return {"msg": "User created successfully"}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": db_user["email"]})
    return {"access_token": token, "token_type": "bearer"}