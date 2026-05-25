# 🛠️ Development & Troubleshooting Guide

This guide contains detailed instructions for developing, debugging, and modifying the application using our Docker environment.

---

## 📋 Prerequisites
* **Docker Desktop**: This is the **only** software you need installed on your host machine to run, compile, and test the entire stack.

---

## 🗄️ How to Connect to MySQL from Your Host Machine
When developing, you might want to view your database tables, run custom SQL queries, or inspect data using an external GUI client like **DBeaver**, **TablePlus**, or **MySQL Workbench**.

You can connect to the dockerized MySQL database using the following settings:

* **Host**: `localhost` (or `127.0.0.1`)
* **Port**: `3307` *(We mapped port 3307 on your machine to port 3306 inside the Docker container to avoid conflicts with any local MySQL server).*
* **Database / Schema**: `indiedev_auth`
* **Username**: `indiedev`
* **Password**: `indiedev123`

---

## 🪵 How to View Logs (Debugging)
Logs are essential for checking if Spring Boot runs into errors (like validation issues, query errors, or Java exceptions) or if Angular has compilation warnings.

* **View logs for all services**:
  ```bash
  docker compose logs -f
  ```

* **View logs only for the Backend (Spring Boot)**:
  ```bash
  docker compose logs -f backend
  ```

* **View logs only for the Frontend (Angular)**:
  ```bash
  docker compose logs -f frontend
  ```

---

## 🔄 Rebuilding After Code Changes
When you edit files in `backend/src` or `frontend/src`, Docker needs to rebuild the corresponding container image to reflect your changes.

* **Rebuild and restart a specific service (e.g., Backend)**:
  ```bash
  docker compose up -d --build backend
  ```

* **Rebuild and restart the Frontend**:
  ```bash
  docker compose up -d --build frontend
  ```

* **Rebuild everything**:
  ```bash
  docker compose up -d --build
  ```

---

## 🔌 What to Do if Ports Conflict
Each service maps a port inside Docker to your physical computer (host):
* **MySQL**: Maps `3307` (host) ➡️ `3306` (container)
* **Backend**: Maps `8080` (host) ➡️ `8080` (container)
* **Frontend**: Maps `4200` (host) ➡️ `4200` (container)

If you see an error like `bind: address already in use` for ports `8080` or `4200`, you can change the mapped host port in `docker-compose.yml`:

1. Open `docker-compose.yml` in the root folder.
2. Locate the service giving the error (e.g., `backend`).
3. Change the left-hand port number in the `ports` section (e.g., from `"8080:8080"` to `"8081:8080"`):
   ```yaml
   backend:
     build: ./backend
     ports:
       - "8081:8080" # Maps local port 8081 instead of 8080
   ```
4. Save the file and run `docker compose up -d`.
5. Access your backend endpoint at [http://localhost:8081/api](http://localhost:8081/api).

---

## 🤝 How to Contribute
Want to start contributing to this project? We follow a strict git workflow and branch naming convention (requiring the GitHub Issue/Item ID).

Please refer to the comprehensive **[CONTRIBUTING.md](file:///Users/rohitmunde/Documents/2.%20Coding/Springboot+%20Angular-Authenticaation-App/CONTRIBUTING.md)** guide in the root folder for step-by-step instructions (from cloning to creating your PR).

