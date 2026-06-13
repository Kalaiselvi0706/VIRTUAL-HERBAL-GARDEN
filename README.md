# 🌿 Virtual Herbal Garden

## Project Overview

The Virtual Herbal Garden is an interactive web-based application designed to provide users with comprehensive information about medicinal plants and their health benefits. The system creates a digital herbal garden where users can explore various herbs, understand their medicinal properties, learn cultivation methods, and discover traditional uses.

The platform combines a user-friendly web interface, database-driven plant information management, image galleries, and search functionality to create an educational environment for students, researchers, and herbal medicine enthusiasts.

The system enables users to browse medicinal plants, search herbs by name or disease, view plant images, learn medicinal uses, and understand cultivation techniques through a centralized digital platform.

The Virtual Herbal Garden is specifically designed for educational institutions and individuals who wish to learn about medicinal plants without physically visiting a herbal garden.

---

## Objective

To develop an interactive Virtual Herbal Garden platform that digitizes herbal plant information by integrating plant details, medicinal uses, image galleries, search functionality, and educational resources.

### The system aims to:

* Digitize herbal plant information.
* Provide detailed medicinal plant descriptions.
* Enable users to search plants based on diseases and medicinal properties.
* Display plant images and scientific classifications.
* Educate users about traditional medicinal practices.
* Provide cultivation and maintenance guidelines.
* Create awareness about herbal medicine.
* Build a centralized repository of medicinal plant data.
* Support future enhancements such as AI-based plant recommendations.

---

## Problem Statement

Many medicinal plants possess significant health benefits and are widely used in traditional medicine. However, information about these herbs is scattered across books, websites, and research papers, making it difficult for students and common users to access reliable information.

This situation often leads to:

* Lack of awareness about medicinal plants.
* Difficulty in identifying herbs.
* Limited access to authentic herbal information.
* Insufficient knowledge about medicinal uses.
* Poor understanding of cultivation methods.
* Absence of a centralized herbal database.

The absence of an interactive digital platform limits learning opportunities and reduces awareness regarding the importance of herbal medicine.

This project addresses these challenges by providing an integrated Virtual Herbal Garden that centralizes medicinal plant information and offers an interactive learning experience.

---

## User & Module Identification

The Virtual Herbal Garden is designed to provide herbal information through multiple interconnected modules.

Users can browse plants, search medicinal herbs, and explore plant details through the web interface, while administrators manage plant records, images, and database information.

---

## Modules List

1. User Management Module

2. Herbal Plant Information Module

3. Plant Search Module

4. Medicinal Uses Module

5. Image Gallery Module

6. Plant Classification Module

7. Admin Management Module

8. Authentication & Access Control Module

---

## System Use Case Overview

### User

* Register/Login
* Search Herbal Plants
* View Plant Details
* View Medicinal Uses
* Browse Image Gallery
* Search by Disease
* Logout

### Administrator

* Login
* Add New Plants
* Update Plant Information
* Upload Plant Images
* Delete Plant Records
* Manage Users
* Generate Reports
* Logout

---

## Site-Centric Module Breakdown

### Herbal Plant Information Module

Stores complete details about medicinal plants including:

* Plant Name
* Scientific Name
* Family
* Description
* Medicinal Uses
* Cultivation Method
* Diseases Cured
* Images

---

## Database Requirement Analysis

The Virtual Herbal Garden requires a centralized database to manage herbal plant information, user accounts, medicinal uses, plant classifications, and image galleries.

The database is designed to support secure user authentication, efficient plant searching, image storage, report generation, and future AI-based recommendations.

---

## Table List

| Table Name     | Description                           |
| -------------- | ------------------------------------- |
| Users          | Stores user account information.      |
| Admin          | Stores administrator details.         |
| Plants         | Stores herbal plant information.      |
| Categories     | Stores plant categories and families. |
| Medicinal_Uses | Stores medicinal uses of plants.      |
| Diseases       | Stores diseases treated by herbs.     |
| Plant_Disease  | Maps plants with diseases.            |
| Images         | Stores plant images and image paths.  |
| Feedback       | Stores user feedback and suggestions. |
| Audit_Logs     | Stores system activity logs.          |

---

## Database Schema

The database schema consists of:

* Users → User authentication details.
* Admin → Administrator information.
* Plants → Herbal plant master table.
* Categories → Plant categories.
* Medicinal_Uses → Herbal medicinal properties.
* Diseases → Disease information.
* Plant_Disease → Relationship between plants and diseases.
* Images → Plant image storage.
* Feedback → User feedback records.
* Audit_Logs → Activity tracking.

---

## Technology Stack

| Component       | Technology Used       |
| --------------- | --------------------- |
| Frontend        | HTML, CSS, JavaScript |
| Backend         | Python / PHP          |
| Database        | MySQL                 |
| Framework       | Flask / Django        |
| Version Control | Git & GitHub          |
| IDE             | VS Code               |

---

## Benefits of the System

* Easy access to medicinal plant information.
* Interactive learning environment.
* Centralized herbal database.
* User-friendly interface.
* Quick search functionality.
* Promotes awareness about herbal medicine.
* Supports educational institutions.
* Reduces dependency on physical herbal gardens.
* Scalable for future AI integration.
