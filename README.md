# ReadInn - LibraryManagementSystem

## Overview
The **Library Management System** is a full-stack web application designed to streamline library operations, improve user experience, and provide multi-platform accessibility. It supports essential functionalities like user authentication, book catalog management, borrowing and returning books, overdue notifications, and detailed reporting, with Role-Based Access Control (RBAC) for enhanced security.

---
[View Deployed Site](https://readinn.netlify.app)

---

## Tech Stack

### Frontend
- **Framework**: Angular 18
- **Styling**: Tailwind CSS
- **Features**: Responsive design for desktop and mobile platforms

### Backend
- **Framework**: Spring Boot
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT) with Role-Based Access Control (RBAC)

---

## Features

### 1. User Authentication and Role Management
- Secure login system for Admin and User roles.
- Role-Based Access Control (RBAC) to manage access to features.
- Users table fields: `UserId`, `Username`, `PasswordHash`, `Role`, `Email`, `PhoneNumber`, `IsActive`.

### 2. Book Catalog
- Database of books with fields: `BookId`, `Title`, `Author`, `Genre`, `PublicationYear`, `ISBN`, `CopiesAvailable`, `Location`.
- Search books by title, author, or genre.

### 3. Borrowing System
- Borrow books and calculate due dates based on policies.
- Update book availability dynamically.
- BorrowedBooks table fields: `BorrowId`, `UserId`, `BookId`, `BorrowDate`, `DueDate`, `Status`.

### 4. Advanced Search
- Filters like genre, author, and availability.
- Live search functionality.
- SearchLogs table fields: `SearchId`, `UserId`, `SearchQuery`, `Date`, `ResultsCount`.

### 5. Return Tracking
- Mark books as returned and calculate late return penalties.
- Fields: `ReturnId`, `BorrowId`, `ReturnDate`, `PenaltyAmount`, `ProcessedBy`.

### 6. Overdue Notifications
- Notify users via email or SMS for upcoming or overdue returns.
- Notifications table fields: `NotificationId`, `UserId`, `Message`, `NotificationType`, `Timestamp`.

### 7. User History
- View borrowing history with details like books, dates, and penalties paid.
- BorrowingHistory table fields: `HistoryId`, `UserId`, `BookId`, `BorrowDate`, `ReturnDate`, `PenaltyPaid`.

### 8. Late Return Penalty Management
- Admin-configurable penalty rules.
- Track penalties in user history.
- Penalties table fields: `PenaltyId`, `UserId`, `Amount`, `Reason`, `DateIssued`, `Status`.

### 9. User Registration and Profile Management
- Registration system with profile updates (e.g., contact details).
- UserProfiles table fields: `UserId`, `Name`, `Address`, `PreferredGenres`, `ProfilePicture`.

### 10. Reports and Analytics
- Admin reports on popular books, overdue records, and trends.
- Dashboard with key performance indicators.
- Reports table fields: `ReportId`, `ReportType`, `Data`, `GeneratedBy`, `DateGenerated`.

### 11. Book Reservation System
- Reserve checked-out books and receive availability notifications.
- Reservations table fields: `ReservationId`, `UserId`, `BookId`, `ReservationDate`, `Status`.

### 12. Multi-Platform Accessibility
- Responsive web design for mobile and desktop.
- Future mobile app development for catalog browsing, borrowing, and notifications.
- PlatformAccess table fields: `PlatformId`, `UserId`, `DeviceType`, `LastAccessed`.

---

## Contact
- **Developer**: Mukund Keshan
- **LinkedIn**: [Linkedin](https://www.linkedin.com/in/mukundkeshan/)
