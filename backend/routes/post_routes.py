from fastapi import APIRouter, Depends, HTTPException, status
from models import Post
from database import db
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

router = APIRouter()
auth_scheme = HTTPBearer()

def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.get("/posts")
async def get_posts(user: str = Depends(get_current_user)):
    posts = await db.posts.find().to_list(100)
    
    for post in posts:
        post["_id"] = str(post["_id"])
    
    return posts


@router.post("/posts")
async def create_post(post: Post, user: str = Depends(get_current_user)):
    post_dict = post.dict()
    post_dict["author"] = user
    await db.posts.insert_one(post_dict)
    return {"msg": "Post created successfully"}