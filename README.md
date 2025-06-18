# 🗣️ ForumPlus — A Modern, Developer-Friendly Forum Application

**ForumPlus** is a full-stack web application built with **FastAPI** (Python) and **React (TypeScript)** that brings the classic power of forums into the modern web. Designed for community discussion, developer Q&A, or internal knowledge sharing, ForumPlus offers clean UX, scalable architecture, and extensible features out of the box.

> 💬 Start conversations. 🔥 Build communities. 🚀 Power discussions with modern tech.

---

Following features are the ones I am currently working on. Any feature that I am currently working will have a **✅** status, any feature I am working on will have **🔧** status. If feature has no status then it means I have not yet picked it.

---

## 🥇 **Essential Core Features**

| Feature                                   | Description                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| ✅**User Authentication (Session-based)** | Secure login system with session-based authentication for enhanced security and better user experience. |
| **Thread Creation & Replies**             | Users can post new threads and reply to existing ones—core forum functionality.                         |
| **Nested Comments**                       | Enables threaded conversations by allowing replies to replies.                                          |
| **Voting System**                         | Users can upvote/downvote posts to surface valuable content.                                            |
| **Tags & Categories**                     | Organize threads into topics and help users discover relevant content.                                  |
| **🔧User Profiles**                       | Each user has a public profile with bio, avatar, and their activity.                                    |
| **Role-Based Access Control (RBAC)**      | Controls user permissions (admin, mod, regular user) for managing content.                              |
| **Search Functionality**                  | Enables users to find threads/posts by keywords or filters.                                             |
| **Admin Moderation Tools**                | Admins can manage users, delete content, and resolve reports.                                           |

---

## 🥈 **Engagement & Retention Features**

| Feature                                | Description                                                    |
| -------------------------------------- | -------------------------------------------------------------- |
| **@Mentions**                          | Notify users when they're tagged in posts or replies.          |
| **Notifications (Real-time or Email)** | Alert users when someone interacts with their content.         |
| **Bookmark / Follow Threads**          | Users can save or follow interesting threads to revisit later. |
| **Markdown Editor with Preview**       | Users write posts with rich formatting, code blocks, etc.      |
| **Mobile-Responsive UI**               | Accessible on all devices with responsive design.              |
| **Dark Mode Toggle**                   | User-friendly theme switcher, now expected in most apps.       |
| **Thread Sorting Options**             | Sort by recent, popular, or most replied threads.              |
| **Pagination & Infinite Scroll**       | Improves performance and readability of long content feeds.    |

---

## 🥉 **Add-on Features**

| Feature                               | Description                                                            |
| ------------------------------------- | ---------------------------------------------------------------------- |
| **Digest Emails**                     | Sends daily/weekly summaries of trending or followed content.          |
| **Gamification (Reputation, Badges)** | Encourages participation by rewarding users for activity.              |
| **Real-Time Updates**                 | Automatically update threads without page reload using WebSockets/SSE. |
| **Custom Avatars & Bio Editing**      | Makes the user profile more personalized and expressive.               |
| **Post Reporting**                    | Allows users to flag inappropriate content for moderation.             |
| **Post Pinning/Locking**              | Admins can pin important threads or lock discussions.                  |

---

## 🚀 **Advanced/Polished Features (Optional)**

| Feature                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| **AI Summarization / Tagging**  | Use LLMs to auto-generate thread summaries or suggest tags.           |
| **Plugin / Webhook System**     | Extensible design so others can hook into forum events.               |
| **PWA Support**                 | Installable app experience on mobile with offline support.            |
| **Embeddable Widgets**          | Share and embed discussions on external sites/blogs.                  |
| **Analytics Dashboard (Admin)** | Shows stats like user activity, thread popularity, etc.               |
| **Custom Domain & Theming**     | Useful for companies or communities hosting their own forum instance. |

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

---

## 📐 Rule of Thumb

| **Use Schemas When**    | **Use Types When**          |
| ----------------------- | --------------------------- |
| Data crosses boundaries | Internal code structure     |
| Need runtime validation | Development-time hints only |
| API requests/responses  | Function signatures         |
| Database models         | Protocols and interfaces    |
| External integrations   | Type aliases and generics   |

**Key principle**: Schemas for **validation**, Types for **organization**.
