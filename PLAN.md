# Pilates Studio Booking System - Hackweek Plan

## Project Overview

A booking management system for a Pilates studio, allowing reception staff to manage classes, instructors, customers, and bookings.

### Primary Users
- Reception workers (admin interface)

### Secondary Users
- Customers (future portal for self-booking)

---

## Core Features

### Must Have (MVP)
1. **Class Type Management (CRUD)**
    - Create, read, update, delete class types (Matwork, Reformer, Barre e.g.)
    - Each type has: name, description, default duration
    - Set capacity (default number of spots, e.g., 12)

2. **Class Schedule Management**
    - Create new class instances at specific times
    - Assign instructor to class
    - View weekly schedule
    - See available spots

3. **Customer Management**
    - View all customers
    - Add/edit/delete customers
    - Store: id, name, email, clerk userid

4. **Booking Management**
    - Book customers into classes (if spots available)
    - Remove bookings
    - Search/view customers when booking
    - Visual feedback on booking status

5. **Seeded Data**
    - Pre-populated class types
    - Sample instructors
    - Sample classes for testing
    - Sample customers already booked into classes

### Nice to Have (Extra Features)
- Check-in a customer
- Self-service check-in via kiosk/printer
- Customer portal dashboard
- Self-registration via Clerk (pending admin activation)
- Customer status management (active/inactive)
- Mobile-responsive UI
- Styled professional interface

---

## Tech Stack

### Backend
- **.NET 9** with ASP.NET Core
- **Entity Framework Core**
- **PostgreSQL** database (hosted on Supabase)
- **Authorization** on API endpoints
- Hosted on **Azure App Service**

### Frontend
- **React** with TypeScript
- **React Router DOM** for navigation
- **TanStack Query** for server state management
- **Clerk** for authentication
- **Tailwind CSS** for styling
- Hosted on **Vercel**

### Infrastructure
- **Domain**: pilates.lundberg.ai
- **Database**: Supabase (PostgreSQL)
- **Backend hosting**: Azure App Service
- **Frontend hosting**: Vercel

---

## Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    ClassType ||--o{ Class : "has many"
    Instructor ||--o{ Class : "teaches"
    Class ||--o{ Booking : "has many"
    Customer ||--o{ Booking : "makes"
    
    ClassType {
        int Id PK
        string Name
        string Description
        int DurationMinutes
        int Capacity
        datetime CreatedAt
        datetime UpdatedAt
    }
    
    Instructor {
        int Id PK
        string FirstName
        string LastName
        string Email
        string Phone
        datetime CreatedAt
        datetime UpdatedAt
    }
    
    Class {
        int Id PK
        int ClassTypeId FK
        int InstructorId FK
        datetime StartTime
        int Capacity
        datetime CreatedAt
        datetime UpdatedAt
    }
    
    Customer {
        int Id PK
        string FirstName
        string LastName
        string Email
        string ClerkUserId
        bool IsActive
        datetime CreatedAt
        datetime UpdatedAt
    }
    
    Booking {
        int Id PK
        int ClassId FK
        int CustomerId FK
        bool IsCheckedIn
        datetime BookedAt
        datetime CheckedInAt
        datetime CreatedAt
    }
```

### Entity Details

**ClassType**
- Defines types of classes offered (Matwork, Reformer, Barre, etc.)
- Contains default duration and capacity for the class type
- Capacity is the default number of spots when creating new classes

**Instructor**
- Studio instructors who teach classes
- Can be assigned to multiple classes
- No login access, managed by reception

**Class**
- Individual scheduled class session
- References a ClassType and Instructor
- Has specific start time and capacity limit
- Capacity determines max number of bookings allowed

**Customer**
- Studio members who book classes
- ClerkUserId links to Clerk authentication (nullable for manually added customers)
- IsActive flag for account status (future feature)

**Booking**
- Links Customer to Class
- Tracks booking timestamp
- Optional check-in tracking (IsCheckedIn, CheckedInAt)
- Cascade deletes when Class is deleted
- One customer can only book one spot per class

---

## API Endpoints

### Class Types
- `GET /api/classtypes` - List all class types
- `GET /api/classtypes/{id}` - Get specific class type
- `POST /api/classtypes` - Create new class type
- `PUT /api/classtypes/{id}` - Update class type
- `DELETE /api/classtypes/{id}` - Delete class type

### Classes
- `GET /api/classes` - List classes (with filters: date range, instructor, type)
- `GET /api/classes/{id}` - Get specific class with bookings
- `POST /api/classes` - Create new class
- `PUT /api/classes/{id}` - Update class
- `DELETE /api/classes/{id}` - Delete class

### Customers
- `GET /api/customers` - List all customers (searchable)
- `GET /api/customers/{id}` - Get specific customer
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Bookings
- `GET /api/bookings` - List all bookings (filterable by class, customer, date)
- `GET /api/classes/{classId}/bookings` - Get bookings for specific class
- `POST /api/bookings` - Create booking
- `DELETE /api/bookings/{id}` - Cancel booking
- `PUT /api/bookings/{id}/checkin` - Check in customer (extra feature)

### Instructors
- `GET /api/instructors` - List all instructors
- `GET /api/instructors/{id}` - Get specific instructor
- `POST /api/instructors` - Create new instructor
- `PUT /api/instructors/{id}` - Update instructor
- `DELETE /api/instructors/{id}` - Delete instructor

---

## UI Pages & Routes

### Main Navigation
- Schedule (`/`)
- Class Types (`/class-types`)
- Instructors (`/instructors`)
- Customers (`/customers`)

### Page Details

**Schedule** (`/`)
- Weekly calendar view
- Navigate between weeks
- Each class shows: type, time, duration, instructor, capacity (e.g., 3/12)
- "Manage" and "Book" buttons per class
- "Schedule Class" button

**Class Types** (`/class-types`)
- Grid of class type cards
- Each card shows: name, description, duration
- Edit and delete actions
- "Add Class Type" button

**Instructors** (`/instructors`)
- List of instructor cards
- Each shows: name, email, certified class types (tags)
- Edit and delete actions
- "Add Instructor" button

**Customers** (`/customers`)
- Searchable table
- Columns: Name, Email, ClerkUserId (optional), Actions
- Edit and delete per row
- "Add Customer" button

### Modals/Dialogs

**Book Customer Modal**
- Triggered from "Book" button on class
- Shows: class type, time, spots remaining
- Search field for customers
- List of customers with booking status
- Book/Unbook toggle per customer

**Schedule Class Modal**
- Select class type
- Select instructor
- Pick date and time
- Set capacity
- Create button

---

## Implementations

### Endpoint Security
1. All API endpoints require valid JWT token from Clerk
2. Token validation middleware checks signature
3. Extract user claims (userId, role) from token
4. Role-based authorization:
    - **Admin** role: full CRUD access
    - **Receptionist** role: full access (for MVP, same as admin)
    - **Customer** role: read-only access (future customer portal)

### Business Rules
- Cannot book if class is at capacity
- Cannot book same customer multiple times in the same class
- Cannot delete class type if classes exist
- Cannot delete customer if active bookings exist
- Cannot delete instructor if assigned to future classes
- Bookings are cascade deleted when class is deleted
- Bookings in past classes are allowed (no validation needed)