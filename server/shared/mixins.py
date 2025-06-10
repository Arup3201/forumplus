from datetime import datetime, timezone
from sqlalchemy.orm import declarative_mixin, declared_attr
from sqlalchemy import Column, DateTime

@declarative_mixin
class TimestampMixin:
    @declared_attr
    def created_at(cls):
        return Column(DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))

    @declared_attr
    def updated_at(cls):
        return Column(DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))