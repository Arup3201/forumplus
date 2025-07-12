from fastapi import APIRouter, HTTPException
from services.core.schemas import ThreadCategory, ThreadRequest, ThreadResponse
from services.core.services.thread import ThreadService

router = APIRouter()

@router.get("/thread-categories")
async def get_thread_categories():
    return {"message": "Thread categories fetched successfully"}

@router.post("/thread-categories")
async def create_thread_category(thread_category: ThreadCategory):
    return {"message": "Thread category created successfully"}

@router.get("/")
async def get_threads():
    return {"message": "Threads fetched successfully"}

@router.get("/{thread_id}")
async def get_thread(thread_id: str):
    return {"message": "Thread fetched successfully"}

@router.post("/", response_model=ThreadResponse)
async def create_thread(thread: ThreadRequest):
    thread_service = ThreadService()
    
    try:
        thread_response = thread_service.create_thread(thread.title, thread.content, thread.category_id, thread.user_id)
        return ThreadResponse(**thread_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    