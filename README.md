# COMP3123 -- Assignment 2

## Full-Stack Employee Management System

### **Student:** Maddox Duggan (101483006)

------------------------------------------------------------------------

# Overview

This is a full‑stack employee management system built using **ReactJS**,
**NodeJS**, **Express**, **MongoDB Atlas**, and **Docker**.\
The system supports authentication, employee CRUD operations, file
upload, search, and a professional UI using Material UI.

------------------------------------------------------------------------

# 🏗️ Project Structure

    101483006_comp3123_assignment2/
    │
    ├── backend/
    │   ├── package.json
    │   ├── src/
    │   └── uploads/
    └── frontend/
        └── src/

------------------------------------------------------------------------

# ✨ Features

### ✔ Authentication

-   Signup\
-   Login\
-   JWT tokens\
-   Protected routes

### ✔ Employee Management

-   Add\
-   View\
-   Edit\
-   Delete\
-   Profile picture upload

### ✔ Search

-   By department\
-   By position

### ✔ Frontend

-   React Router\
-   Material UI\
-   Responsive\
-   Axios service\
-   Validation

### ✔ Backend

-   Express\
-   MongoDB Atlas\
-   Multer uploads\
-   JWT protection\
-   MVC organization


------------------------------------------------------------------------

# 📡 API Endpoints

## Authentication

  Method   Endpoint   Description
  -------- ---------- -------------
  POST     /signup    Register
  POST     /login     Login

## Employees

  Method   Endpoint         Description
  -------- ---------------- -------------
  GET      /employees       List
  POST     /employees       Add
  GET      /employees/:id   View
  PUT      /employees/:id   Update
  DELETE   /employees/:id   Delete

Supports:

    /employees?department=IT  
    /employees?position=Manager



------------------------------------------------------------------------

# 🎓 Notes

This project implements the full COMP3123 Assignment 2 requirements,
including frontend, backend, search, validation, authentication, Docker,
and UI/UX best practices.

------------------------------------------------------------------------

# 🙌 Developer

**Maddox Ryder**\
George Brown College\
COMP3123 -- Full Stack Development
