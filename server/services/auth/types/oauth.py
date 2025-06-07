from enum import Enum
from datetime import datetime, timezone
from typing import Dict, Optional
from fastapi import Request
from authlib.integrations.starlette_client import StarletteOAuth2App

class OAuthProvider(str, Enum):
    GOOGLE = 'google'
    GITHUB = 'github'

class OAuthState:
    ip_address: str
    user_agent: str
    device_info: Dict
    provider: OAuthProvider
    created_at: datetime
    expires_at: datetime
    
    def __init__(self, ip_address: str, user_agent: str, device_info: Dict, provider: OAuthProvider, expires_at: datetime, created_at: Optional[datetime]=datetime.now(tz=timezone.utc)):
        self.ip_address = ip_address
        self.user_agent = user_agent
        self.device_info = device_info
        self.provider = provider
        self.created_at = created_at
        self.expires_at = expires_at

OAuthStates = Dict[str, OAuthState]

class OAuthAppWrapper:
    def __init__(self, app: StarletteOAuth2App):
        self.app = app
        self.name = app.name
        self.client_id = app.client_id
        
    async def authorize_redirect(self, request: Request, redirect_uri: str, state: str):
        return await self.app.authorize_redirect(request, redirect_uri, state=state)
    
    async def authorize_access_token(self, request: Request):
        return await self.app.authorize_access_token(request)
    
    async def get(self, resource: str, token: Optional[Dict]=None):
        return await self.app.get(resource, token=token)