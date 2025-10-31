from fastapi import APIRouter

router = APIRouter(prefix="/laliga", tags=["La Liga"])

@router.get("/hello")
def hello():
    return {"message": "Hello!"}