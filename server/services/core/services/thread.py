from bleach import clean
from bleach.css_sanitizer import CSSSanitizer
from html.parser import HTMLParser
from typing import Dict
from shared.database import DatabaseManager
from services.core.repositories import ThreadRepository

class HTMLContentProcessor:
    # Define allowed HTML elements and attributes
    ALLOWED_TAGS = {
        'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'div', 'span',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
    }
    
    ALLOWED_ATTRIBUTES = {
        'a': ['href', 'title', 'target', 'rel'],
        'img': ['src', 'alt', 'title', 'width', 'height'],
        '*': ['class', 'id', 'style']  # Allowed for all tags
    }
    
    ALLOWED_STYLES = {
        'color', 'background-color', 'font-size', 'font-weight', 'text-align',
        'margin', 'padding', 'border', 'border-radius'
    }
    
    @staticmethod
    def sanitize_html(html_content: str) -> str:
        """
        Sanitize HTML content by removing potentially dangerous elements and attributes
        """
        css_sanitizer = CSSSanitizer(allowed_css_properties=HTMLContentProcessor.ALLOWED_STYLES)
        return clean(
            html_content,
            tags=HTMLContentProcessor.ALLOWED_TAGS,
            attributes=HTMLContentProcessor.ALLOWED_ATTRIBUTES,
            css_sanitizer=css_sanitizer,
            strip=True,
            strip_comments=True
        )
    
    @staticmethod
    def validate_html(html_content: str) -> bool:
        """
        Validate HTML content for basic structure and security
        """
        try:
            # Check for maximum length
            if len(html_content) > 50000:  # Adjust based on your needs
                return False
                
            # Check for potentially dangerous patterns
            dangerous_patterns = [
                'javascript:', 'data:', 'vbscript:', 'onload=', 'onerror=',
                'onclick=', 'onmouseover=', 'eval(', 'document.cookie'
            ]
            
            for pattern in dangerous_patterns:
                if pattern.lower() in html_content.lower():
                    return False
                    
            # Basic HTML structure validation
            parser = HTMLParser()
            parser.feed(html_content)
            return True
            
        except Exception:
            return False
    
    @staticmethod
    def extract_plain_text(html_content: str) -> str:
        """
        Extract plain text from HTML for search indexing
        """
        from html2text import HTML2Text
        converter = HTML2Text()
        converter.ignore_links = False
        converter.ignore_images = True
        return converter.handle(html_content)
    
    @classmethod
    def process_html_content(cls, html_content: str) -> Dict[str, str]:
        """
        Process HTML content through the complete pipeline
        """
        if not cls.validate_html(html_content):
            raise ValueError("Invalid HTML content")
            
        sanitized_html = cls.sanitize_html(html_content)
        plain_text = cls.extract_plain_text(sanitized_html)
        
        return {
            "content": sanitized_html,
            "content_plain": plain_text,
            "content_type": "html"
        }

class ThreadService:
    def __init__(self, db_manager: DatabaseManager):
        self.db_manager = db_manager
    
    def create_thread(self, thread_title: str, thread_content: str, thread_category_id: str, user_id: str) -> str:
        html_content = HTMLContentProcessor.process_html_content(thread_content)
        with self.db_manager.get_session() as db_session:
            thread_repo = ThreadRepository(db_session)
            thread = thread_repo.create_thread({
                "title": thread_title,
                "content": html_content["content"],
                "content_plain": html_content["content_plain"],
                "content_type": html_content["content_type"],
                "category_id": thread_category_id,
                "author_id": user_id
            })
            return thread