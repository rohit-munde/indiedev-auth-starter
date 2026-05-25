# 🚀 Quick Start Guide

Welcome! This guide will help you run the entire application (Frontend, Backend, and Database) with **a single command**. 

You do **not** need to install Node.js, Java, or MySQL on your computer. Everything runs automatically inside Docker.

---

## ⚡ 3-Step Setup

### Step 1: Install Docker Desktop
Make sure you have **Docker Desktop** installed and running on your computer.
* 💻 [Download Docker Desktop for Mac / Windows / Linux](https://www.docker.com/products/docker-desktop/)
* Make sure the Docker application is open and running (you should see a green icon indicating "Docker Desktop is running").

---

### Step 2: Start the Application
Open your terminal (or Command Prompt) in this project folder and run:
```bash
docker compose up -d
```

> [!NOTE]
> **What does this do?**
> This command automatically downloads all required dependencies, compiles the Spring Boot backend, builds the Angular frontend, sets up the MySQL database, and links them together!
> This first run might take **2 to 3 minutes** as it builds everything. Subsequent runs will start almost instantly.

---

### Step 3: Open the Web App
Once the command finishes, wait a few seconds and open your web browser to:

👉 **[http://localhost:4200](http://localhost:4200)**

You will see the Angular frontend dashboard ready and connected to your Spring Boot API!

---

## 🛠️ Common Docker Commands

Here are the only commands you will ever need to manage your application:

* **Stop the application**:
  ```bash
  docker compose down
  ```
  *(Stops all running containers without losing your database data).*

* **View running status**:
  ```bash
  docker compose ps
  ```

* **View logs (errors or debug info)**:
  ```bash
  docker compose logs -f
  ```
  *(Press `Ctrl + C` to stop watching the logs).*

* **Reset everything (fresh start)**:
  ```bash
  docker compose down -v
  ```
  *(Stops the application and wipes out all database records so you start completely clean).*

---

## 🔍 Troubleshooting

### ❌ Error: "Cannot connect to the Docker daemon"
* **Why**: Docker Desktop is not running.
* **Fix**: Open the **Docker Desktop** app on your computer, wait 30 seconds for it to start, and try your command again.

### ❌ Ports conflict or address already in use
* **Why**: Another database or application is already running on port `3306` (or `8080`, `4200`) on your computer.
* **Fix**: We configured the MySQL database inside Docker to expose itself on port **`3307`** instead of the standard `3306` to avoid conflicts with any local MySQL you may have. If you face any other port conflict, refer to the `DEVELOPMENT.md` guide.

### ❌ Backend can't connect to Database
* **Why**: The backend started before the MySQL database was fully ready.
* **Fix**: Don't worry! We configured a "health check" that ensures the backend waits until MySQL is completely ready. If it still fails, just run:
  ```bash
  docker compose restart backend
  ```
