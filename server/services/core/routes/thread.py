from fastapi import APIRouter

router = APIRouter()

@router.get("/thread-categories")
def get_thread_categories():
    return {"message": "Thread categories fetched successfully"}

@router.post("/thread-categories")
def create_thread_category(thread_category: ThreadCategory):
    return {"message": "Thread category created successfully"}

@router.get("/")
def get_threads():
    return {"message": "Threads fetched successfully"}

@router.get("/{thread_id}")
def get_thread(thread_id: str):
    return {"message": "Thread fetched successfully"}

@router.post("/")
def create_thread(thread: Thread):
    return {"message": "Thread created successfully"}