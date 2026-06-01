# Installation Guide - E-First Aid

## Overview

E-First Aid is a healthcare management web application that provides:

* Online appointment booking
* First-aid assistance
* Doctor specialization services
* Appointment tracking
* Notification management
* Emergency ambulance access
* Hospital location support

The application uses:

* HTML5
* CSS3
* JavaScript
* PHP
* MySQL

---

# System Requirements

Before installing the project, ensure the following software is available:

## Required Software

* PHP 8.0 or later
* MySQL 5.7+ or MariaDB
* Apache Web Server
* XAMPP, WAMP, or Laragon
* Modern Web Browser (Chrome, Firefox, Edge)

### Recommended Environment

* XAMPP 8.x
* PHP 8.x
* MySQL 8.x

---

# Project Structure

```text
E-First-Aid/
│
├── index.html
├── style.css
├── script.js
│
├── get_doctors.php
├── save_appointment.php
├── db_connect.php
├── test_connection.php
├── database.sql
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── uploads/
│
├── README.md
├── INSTALLATION.md
└── LICENSE
```

---

# Installation Steps

## Step 1: Install XAMPP

Download and install XAMPP:

https://www.apachefriends.org

After installation, start:

* Apache
* MySQL

from the XAMPP Control Panel.

---

## Step 2: Copy Project Files

Copy the project folder:

```text
E-First-Aid
```

into:

```text
xampp/htdocs/
```

Example:

```text
C:/xampp/htdocs/E-First-Aid/
```

---

## Step 3: Create Database

Open phpMyAdmin:

```text
http://localhost/phpmyadmin
```

### Create Database

Create a new database:

```sql
e_first_aid
```

---

## Step 4: Import Database

1. Open phpMyAdmin
2. Select database:

```text
e_first_aid
```

3. Click Import
4. Choose:

```text
database.sql
```

5. Click Go

This will create all required tables and sample data.

---

## Step 5: Configure Database Connection

Open:

```text
db_connect.php
```

Update database credentials:

```php
<?php

$host = "localhost";
$username = "root";
$password = "";
$database = "e_first_aid";

$conn = new mysqli(
    $host,
    $username,
    $password,
    $database
);

if ($conn->connect_error) {
    die("Connection Failed: " . $conn->connect_error);
}

?>
```

Modify values if your MySQL configuration is different.

---

## Step 6: Test Database Connection

Open:

```text
http://localhost/E-First-Aid/test_connection.php
```

Expected output:

```text
Database Connected Successfully
```

If an error appears:

* Verify MySQL is running
* Check database name
* Verify username and password

---

## Step 7: Configure Upload Directory

Create upload folder if not already available:

```text
assets/uploads/
```

Ensure PHP has write permissions.

This directory stores uploaded patient reports.

Supported formats:

* PDF
* JPG
* JPEG
* PNG

---

## Step 8: Launch the Application

Open browser and navigate to:

```text
http://localhost/E-First-Aid/
```

or

```text
http://localhost/E-First-Aid/index.html
```

---

# Backend Components

## db_connect.php

Responsible for:

* Establishing MySQL connection
* Sharing database connection with other PHP files

---

## get_doctors.php

Responsible for:

* Receiving specialization requests
* Retrieving doctors from database
* Returning doctor information to frontend

Example:

```text
Cardiology
Pediatrics
Neurology
Dermatology
```

---

## save_appointment.php

Responsible for:

* Receiving appointment form data
* Validating user inputs
* Uploading medical reports
* Storing appointment records in database

---

## test_connection.php

Responsible for:

* Testing database connectivity
* Diagnosing database configuration issues

---

## database.sql

Contains:

* Database schema
* Table definitions
* Sample records
* Doctor information
* Appointment tables

---

# Browser Permissions

## Camera Access

The First Aid module uses the device camera.

When prompted:

```text
Allow Camera Access → Allow
```

Required for:

* Wound inspection
* First Aid image capture

---

## File Upload Access

Required for:

* Uploading previous medical reports

Accepted formats:

```text
.pdf
.jpg
.jpeg
.png
```

---

# Verification Checklist

After installation verify:

✅ Apache is running

✅ MySQL is running

✅ Database imported successfully

✅ Database connection test passes

✅ Appointment booking form works

✅ Doctor list loads correctly

✅ File uploads work

✅ First Aid module opens successfully

✅ Notifications display correctly

---

# Troubleshooting

## Database Connection Failed

Check:

* MySQL service is running
* Database name is correct
* Username/password are correct

---

## Doctor List Not Loading

Check:

* get_doctors.php exists
* AJAX request URL is correct
* Database contains doctor records

---

## Appointment Not Saving

Check:

* save_appointment.php permissions
* Database table structure
* Form validation errors

---

## File Upload Error

Verify:

* uploads folder exists
* Folder permissions are writable
* File size is within PHP limits

Update php.ini if necessary:

```ini
upload_max_filesize = 10M
post_max_size = 12M
```

Restart Apache after changes.

---

# Application Ready

After completing all steps, the E-First Aid system will be fully operational and ready for appointment management, first-aid assistance, doctor consultation services, and healthcare record handling.
