# 🤝 Student Contribution Guide

This guide will walk you through the step-by-step process of contributing to this project. We will start from cloning the repository, creating a branch according to our naming rules, making changes, and pushing them back to GitHub.


## 🚀 Step-by-Step Git Workflow

### Step 1: Fork the Repository
Go to the repository on GitHub and click the **Fork** button in the top-right corner to create your own copy of the repository.

---

### Step 2: Clone Your Forked Repository
Clone your fork to your local computer (replace `YOUR-USERNAME` with your actual GitHub username):
```bash
git clone git@github.com:YOUR-USERNAME/indiedev-auth-starter.git
```

---

### Step 3: Navigate Into the Project Folder
Move into the project's root directory:
```bash
cd indiedev-auth-starter
```

---

### Step 4: Link to the Original Repository (Upstream)
Add a remote link to the original repository so you can sync the latest changes in the future:
```bash
git remote add upstream git@github.com:rohit-munde/indiedev-auth-starter.git
```

---

### Step 5: Switch to the Main Branch
Make sure you are on the `main` branch before creating your feature branch:
```bash
git checkout main
```

---

### Step 6: Pull the Latest Changes
Get any new updates from the original repository:
```bash
git pull upstream main
```

---

### Step 7: Create and Switch to Your New Branch
Create your branch using the **Issue ID Rule** (e.g., if you are working on Issue #42):
```bash
git checkout -b feature/issue-42-add-login-validation
```

---

### Step 8: Build and Test Your Code Locally
Start the application inside Docker to test your changes:
```bash
docker compose up -d --build
```