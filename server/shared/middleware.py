from typing import Callable
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from shared.session import SessionManager
from shared.constant import SESSION_COOKIE_NAME
from shared.database import get_db_manager

async def auth_middleware(request: Request, call_next: Callable):
    """Middleware to protect private routes by validating session cookie"""
    
    # Skip auth check for public routes
    if request.url.path.startswith(('/api/auth/google', '/api/auth/github')):
        return await call_next(request)

    try:
        # Get session ID from cookie
        session_id = request.cookies.get(SESSION_COOKIE_NAME)
        if not session_id:
            raise HTTPException(status_code=401, detail="Unauthorized - No session found")

        # Validate session
        db_manager = get_db_manager()
        with db_manager.get_session() as db_session:
            session_manager = SessionManager(db_session)
            if not session_manager.validate_session(session_id):
                raise HTTPException(status_code=401, detail="Unauthorized - Invalid session")

        # Proceed with request if session is valid
        response = await call_next(request)
        return response

    except HTTPException as e:
        return JSONResponse(
            status_code=e.status_code,
            content={"detail": e.detail}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal server error: {str(e)}"}
        )
