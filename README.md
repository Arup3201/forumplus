# <img src="./logo.png" alt="Logo" width="25" /> ForumPlus — A Modern, Developer-Friendly Forum Application

**ForumPlus** is a full-stack web application built with **FastAPI** (Python) and **React (TypeScript)** that brings the classic power of forums into the modern web. Designed for community discussion, developer Q&A, or internal knowledge sharing, ForumPlus offers clean UX, scalable architecture, and extensible features out of the box.

> 💬 Start conversations. 🔥 Build communities. 🚀 Power discussions with modern tech.

---

## 🚀 Current Features

ForumPlus includes the following core features:

### 🔐 Authentication & User Management

- **OAuth Integration**: Sign in with Google or GitHub accounts
- **Protected Routes**: Secure access to authenticated areas
- **User Profiles**: Customizable user profiles with display names, bios, and interests
- **Profile Management**: Edit profile information including display name, username, bio, and interests
- **Session Management**: Secure session handling with HTTP-only cookies

### 🏗️ Technical Architecture

- **Frontend**: React 18 with TypeScript and Vite
- **Backend**: FastAPI with Python
- **Database**: SQLAlchemy ORM with repository pattern
- **Microservice Architecture**: Modular service-based backend structure

---

## How to get started?

First you need to have the virtual environment inside the server. You can do that by -

Change the current directory to `server` by doing `cd server`. Then

1. Create the virtual environment `.pyenv`.
```sh
python -m venv .pyenv # windows
python3 -m venv .pyenv # linux
```

2. Install the libraries.
```sh
pip install -r requirements.txt
```

Then you would need `.env` file where you will have all the secret information like the `SECRET_KEY` and some more confidential infos. Following is the structure of the `.env` file.

```
SECRET_KEY=

GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=

GITHUB_CLIENT_SECRET=
GITHUB_CLIENT_ID=

PG_USER=
PG_PASSWORD=
PG_HOST=
PG_PORT=
PG_DATABASE=

SQL_ECHO= # False/True
```

First you need to create a database for this application where all the tables will be created. I am using PostgreSQL in this project, so you have to create a new database on postgres.

Then for github and google authentication, you will need to get client ids and secret ids.

For more information about how you can do that, follow this steps -

- [Google OAuth 2.0 for client side applications](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
- [Create Github OAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and then you can access the client and secret ids by going inside the OAuth app in Github.

As for the secret key, you can get one for testing from [here](https://randomkeygen.com/).

After you are done putting all the values in the `.env`, your backend is done. You only need to run a script which will create all the necessary tables inside your database.

```sh
python -m scripts.init_db
```

If your database setup and the data inside the `.env` is correct, it should create all the necessary tables.

After this comes the frontend part. For frontend you will need node. If node is not install, please install it from [here](https://nodejs.org/en/download).

Then you have to change directory to `app` by `cd app` if you are inside `forumplus` root directory.

And then you can just install all the libraries by -

```sh
npm install
```

For the frontend you will also need `.env` file, which has the following content -

```
VITE_API_URL=
VITE_APP_TITLE=
VITE_TINYMCE_API_KEY=
```

For now you can keep them as it is. We might change the editory from TinyMCE later.

## Launch `forumplus`

After all the setup is done, you can come to the root directory and run -

```sh
./start-app.bat # windows
sh start-app.sh # linux
```