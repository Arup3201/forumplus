# <img src="./logo.png" alt="Logo" width="25" /> ForumPlus — A Modern, Developer-Friendly Forum Application

**ForumPlus** is a full-stack web application built with **FastAPI** (Python) and **React (TypeScript)** that brings the classic power of forums into the modern web. Designed for community discussion, developer Q&A, or internal knowledge sharing, ForumPlus offers clean UX, scalable architecture, and extensible features out of the box.

> 💬 Start conversations. 🔥 Build communities. 🚀 Power discussions with modern tech.

---

# 🚀 Current Features

ForumPlus includes the following core features:

## 🔐 Authentication & User Management

- **OAuth Integration**: Sign in with Google or GitHub accounts
- **Protected Routes**: Secure access to authenticated areas
- **User Profiles**: Customizable user profiles with display names, bios, and interests
- **Profile Management**: Edit profile information including display name, username, bio, and interests
- **Session Management**: Secure session handling with HTTP-only cookies
- **User Activity Tracking**: Recent activity display on user profiles

## 🏗️ Technical Architecture

- **Frontend**: React 18 with TypeScript and Vite
- **Backend**: FastAPI with Python
- **Database**: SQLAlchemy ORM with repository pattern
- **Microservice Architecture**: Modular service-based backend structure

---

# Microservice Architecture Structure

The server follows a **microservice architecture** where each folder inside the `server` directory represents an independent service that can operate without dependencies on other services.

## Service Structure

Each service follows a standardized 5-layer architecture:

### 🛣️ Routes

**Purpose**: API endpoint definitions using FastAPI

- Defines HTTP route handlers (`@router.get`, `@router.post`, etc.)
- Handles dependency injection
- Specifies request/response models for payload validation
- Contains minimal logic - delegates to service layer

### 🏢 Services

**Purpose**: Business logic implementation

- Contains core business rules and workflows
- Orchestrates repository operations for CRUD functionality
- Handles cross-cutting concerns (authentication, authorization, caching)
- Coordinates between multiple repositories when needed

### 📋 Schemas

**Purpose**: Data validation and serialization contracts

- Defines structure and validation rules using Pydantic
- Used for data crossing boundaries (API requests/responses, database models, external APIs)
- Provides runtime type checking and validation
- Handles serialization/deserialization (JSON ↔ Python objects)

### 🏷️ Types

**Purpose**: Static type definitions for development

- Provides compile-time type hints for IDEs and type checkers
- Includes protocols, type aliases, generics, and unions
- **No runtime validation** - purely for development-time type safety
- Improves code organization and developer experience

### 🗄️ Repositories

**Purpose**: Data access abstraction layer

- Implements database operations using SQLAlchemy ORM
- Provides CRUD operations and custom queries
- Uses **Repository Pattern** with:
  - **Interface/Protocol**: Defines contract (what methods must exist)
  - **Implementation**: Actual database interaction logic
- Abstracts database concerns from business logic
