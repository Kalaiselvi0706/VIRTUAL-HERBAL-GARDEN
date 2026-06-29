# 🌿 Virtual Herbal Garden

##  Project Overview

The Virtual Herbal Garden is an AI-powered web application designed to create a digital platform for exploring and learning about medicinal plants and their health benefits. The system provides detailed information about various herbs including their scientific names, medicinal properties, medicinal uses, cultivation methods, and images through an interactive and user-friendly interface.

The platform combines a React-based frontend, MySQL/PostgreSQL database, AI-powered chatbot assistance, and an analytics dashboard to provide an engaging learning experience. Users can search herbs, view plant details, explore medicinal uses, and receive AI-based suggestions for herbal remedies and plant recommendations.

The system is specifically designed for students, researchers, healthcare enthusiasts, and the general public who wish to gain knowledge about traditional medicinal plants in a centralized and easily accessible digital environment.

---

##  Objective

To develop a centralized Virtual Herbal Garden platform that digitizes herbal plant information and provides intelligent assistance for learning medicinal plant uses.

The system aims to:

- Digitize herbal plant information.
- Centralize medicinal plant records.
- Provide detailed information about herbs and their benefits.
- Enable herb searching and categorization.
- Display plant images and cultivation methods.
- Generate plant-wise and category-wise reports.
- Provide AI-powered herbal recommendations.
- Improve awareness about traditional medicinal plants.
- Build a historical repository for future herbal research.

---

##  Problem Statement

Traditional medicinal plant knowledge is often scattered across books, websites, and local practices. Many people find it difficult to access reliable and organized information about medicinal herbs.

This approach often leads to:

- Lack of awareness about medicinal plants.
- Difficulty in identifying herbs.
- Incomplete or inaccurate herbal information.
- Poor accessibility to traditional knowledge.
- Difficulty in searching plant uses.
- Lack of digital learning platforms.
- Limited interaction with herbal databases.

The absence of a centralized digital herbal management system limits knowledge sharing and makes herbal education less accessible.

This project addresses these challenges by providing an integrated Virtual Herbal Garden platform that centralizes herbal information, enables intelligent search, and provides AI-assisted recommendations.

---

##  User & Module Identification

The Virtual Herbal Garden system is designed to provide herbal information through multiple interconnected modules.

### Users

- Students
- Researchers
- General Users
- Administrators

The system also includes an AI-powered Herbal Assistant that enables users to retrieve information and recommendations using natural language queries.

---

##  Modules List

### 1. User Management Module

Manages user registration, login, profile management, and authentication. It ensures secure access to the Virtual Herbal Garden platform.

### 2. Herbal Plant Information Module

Stores and manages detailed information about medicinal plants such as plant name, scientific name, description, medicinal properties, and benefits.

### 3. Plant Category Management Module

Organizes herbs into different categories such as Ayurvedic Plants, Medicinal Herbs, Aromatic Plants, and Home Remedies for easy navigation.

### 4. Search & Recommendation Module

Allows users to search plants using keywords and provides personalized herbal recommendations based on medicinal uses and categories.

### 5. AI Herbal Assistant Module

Enables users to ask questions in natural language and receive AI-generated responses regarding medicinal plants, their uses, and cultivation methods.

### 6. Dashboard & Analytics Module

Displays statistical information such as total plants, categories, popular herbs, user activities, and search trends through graphical dashboards.

### 7. Image Gallery Module

Stores and displays high-quality images of medicinal plants for easy identification and learning.

### 8. Authentication & Access Control Module

Provides role-based access control and ensures that only authorized users can access administrative functionalities.

---

##  System Use Case Overview

### Actors

- User
- Administrator
- AI Herbal Assistant

### User Use Cases

- Register/Login
- Search Herbs
- View Plant Details
- View Medicinal Uses
- View Cultivation Methods
- Browse Categories
- Ask AI Assistant
- View Images

### Administrator Use Cases

- Add New Herbs
- Update Herb Information
- Manage Categories
- Upload Images
- Generate Reports
- Manage Users

---

##  Database Requirement Analysis

The Virtual Herbal Garden system requires a centralized database to manage herbal plant information, categories, users, medicinal uses, images, and AI recommendations.

The database is designed to support:

- Real-time plant information retrieval.
- User authentication and authorization.
- Herbal plant categorization.
- Search and filtering operations.
- AI-powered recommendations.
- Report generation and analytics.
- Historical data storage and analysis.

The database follows a modular architecture where all herbal information is interconnected and can be accessed efficiently through the web platform.

---

##  Table List

| Table Name | Description |
|------------|-------------|
| Users | Stores user account and login details |
| Roles | Stores user roles and permissions |
| Herbal_Plants | Stores herbal plant information |
| Categories | Stores herbal plant categories |
| Medicinal_Uses | Stores medicinal properties and uses |
| Plant_Images | Stores plant image details |
| Cultivation_Methods | Stores cultivation and growing information |
| Recommendations | Stores AI-generated herbal recommendations |
| Search_History | Stores user search activities |
| Feedback | Stores user feedback and reviews |
| Notifications | Stores system notifications |
| Audit_Logs | Stores system activity history |

---

##  Database Schema

The Virtual Herbal Garden database schema is designed using a relational database model. The schema consists of multiple interconnected tables such as Users, Roles, Herbal Plants, Categories, Medicinal Uses, Plant Images, Cultivation Methods, Recommendations, Search History, Feedback, Notifications, and Audit Logs.

Each herbal plant is associated with a specific category and contains information regarding medicinal uses, cultivation methods, and images. User activities such as searches and feedback are also stored in the database to improve recommendations and system analytics.

The schema ensures:

- Data consistency.
- Reduced data redundancy.
- Faster information retrieval.
- Secure user management.
- Efficient report generation.
- Scalability for future enhancements.

---

##  UI Wireframe Design

The Virtual Herbal Garden user interface is designed with simplicity and ease of navigation. The wireframes include Home Page, Login Page, Dashboard, Plant Details Page, Search Page, Category Page, and AI Assistant Page. The design focuses on providing an attractive and responsive user experience across different devices.

### UI Pages

- Home Page
- Login Page
- User Dashboard
- Herbal Plant Details Page
- Plant Category Page
- Search Page
- AI Herbal Assistant Page
- User Profile Page

### Design Features

- Responsive Design
- User-Friendly Interface
- Attractive Layout
- Easy Navigation
- Mobile Compatible

---

## Login & Dashboard UI Design

The Login page provides secure authentication for users and administrators. Users can access the system using their email and password. After successful login, users are redirected to the Dashboard which displays important information and quick access menus.

### Login Features

- User Registration
- User Login
- Forgot Password
- Secure Authentication
- Role-Based Access

### Dashboard Features

- Total Herbal Plants
- Total Categories
- Recently Added Plants
- Popular Medicinal Herbs
- AI Herbal Assistant
- Search Functionality
- User Profile

The dashboard provides a centralized view of all important functionalities of the Virtual Herbal Garden.

---

##  Navigation & Form Design

The Virtual Herbal Garden provides an easy-to-use navigation system that helps users access different modules quickly and efficiently.

### Navigation Menu

- Home
- Herbal Plants
- Categories
- Search
- AI Assistant
- Dashboard
- Profile
- Logout

### Forms Available

#### User Forms

- Registration Form
- Login Form
- Profile Update Form
- Feedback Form

#### Admin Forms

- Add Herbal Plant Form
- Update Plant Information Form
- Add Category Form
- Upload Plant Image Form

### Form Features

- Input Validation
- Error Handling
- Responsive Layout
- Easy Data Entry
- User-Friendly Design

---

##  Design Review

The Virtual Herbal Garden design is reviewed to ensure that all modules are properly integrated and provide a seamless user experience.

### Review Criteria

- User Interface Consistency
- Ease of Navigation
- Database Design
- Module Integration
- Responsiveness
- User Experience
- Security Features
- Performance

### Design Approval

The design is approved after validating:

- Functional Requirements
- Database Structure
- User Interface Design
- Navigation Flow
- Security Mechanisms
- Overall System Performance

---

## Frontend Environment Setup

The frontend of the Virtual Herbal Garden is developed using React JS to provide an interactive and responsive user experience.

### Technologies Used

- React JS
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Node JS
- MySQL / PostgreSQL

### Development Environment

- Visual Studio Code
- Node Package Manager (npm)
- Git & GitHub
- Chrome Browser

### Project Setup Steps

1. Install Node JS and npm.

2. Create a React Project using Create React App or Vite.

3. Install required dependencies and packages.

4. Create reusable React components.

5. Configure routing for different pages.

6. Connect frontend with backend APIs.

7. Test all UI pages and functionalities.

8. Deploy the application for public access.

### Expected Outcome

- Responsive User Interface
- Faster Page Loading
- Easy Navigation
- Interactive User Experience
- Secure Authentication
- Efficient Data Management

---

##  Future Enhancements

- AI-based disease prediction using medicinal plants.
- Voice-enabled herbal assistant.
- Multi-language support.
- Mobile application support.
- Personalized herbal recommendations.
- Integration with IoT-based smart gardens.
