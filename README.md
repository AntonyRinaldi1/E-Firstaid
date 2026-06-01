# 🏥 E-First Aid

E-First Aid is a web-based healthcare and emergency assistance platform designed to provide users with quick access to medical services, appointment scheduling, first-aid guidance, and healthcare information through an intuitive and responsive interface.

---

## 📋 Table of Contents

* Overview
* Features
* Technologies Used
* Project Structure
* Installation
* Usage
* Modules
* Future Enhancements
* License

---

# 📖 Overview

E-First Aid aims to bridge the gap between patients and healthcare services by offering a centralized platform for:

* Online appointment booking
* Emergency ambulance access
* Nearby hospital location services
* First-aid assistance
* General health checkups
* Doctor specialization browsing
* Appointment tracking
* Prescription management
* User notifications

The application is designed for educational and healthcare management purposes.

---

# ✨ Features

## 🚑 Emergency Services

* One-click emergency ambulance call (108)
* Quick access to nearby hospitals through Google Maps
* Emergency services available directly from the navigation menu

---

## 📅 Appointment Booking

Patients can:

* Enter personal information
* Select preferred appointment time
* Choose medical specialization
* Upload previous medical reports
* Book appointments online

### Supported File Formats

* PDF
* JPG
* JPEG
* PNG

---

## 👨‍⚕️ Medical Departments

The platform currently supports:

* Cardiology
* Pediatrics
* Nephrology
* Neurology
* Dermatology
* Orthopedics

Users can browse doctors according to their specialization.

---

## 🩹 First Aid Assistance

The First Aid module allows users to:

* Describe injuries or wounds
* Access device camera
* Receive AI-assisted first-aid recommendations
* Obtain preliminary guidance before consulting a healthcare professional

---

## 🩺 General Health Checkups

Available checkup options include:

* Blood Pressure Check
* Blood Sugar Test
* Heart Rate Check
* Temperature Check
* Eye Checkup
* Full Body Checkup

---

## 🔔 Notification System

Users receive updates regarding:

* Appointment reminders
* Prescription updates
* Upcoming consultations

---

## 📑 Appointment Management

Appointments are categorized into:

### Past Appointments

* Completed consultations
* Available prescriptions

### Current Appointments

* Ongoing consultations
* Real-time appointment status

### Upcoming Appointments

* Scheduled future visits
* Appointment preparation instructions

---

## 💊 Prescription Tracking

Patients can:

* View prescriptions from completed appointments
* Track medication instructions
* Access treatment recommendations

---

## 📞 Contact Support

The Contact Us section allows users to:

* Send inquiries
* Request assistance
* Communicate with healthcare providers

---

# 🛠 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Browser APIs

* File Upload API
* MediaDevices Camera API
* Form Validation API

# 📂 Project Structure

```text
E-First-Aid/
│
├── index.html                  # Main application interface
├── style.css                   # Application styling
├── script.js                   # Frontend functionality and interactions
│
├── get_doctors.php             # Fetches doctors based on specialization
├── save_appointment.php        # Stores appointment details in the database
├── db_connect.php              # Database connection configuration
├── test_connection.php         # Tests database connectivity
├── database.sql                # Database schema and sample data
│
├── assets/
│   ├── images/                 # Project images and graphics
│   ├── icons/                  # Icons used in the interface
│   └── uploads/                # Uploaded medical reports
│
├── README.md                   # Project documentation
├── INSTALLATION.md             # Installation guide
└── LICENSE                     # License information
```

## Backend Files

### db_connect.php

Establishes a connection between the application and the MySQL database.

### get_doctors.php

Retrieves doctor information based on the selected medical specialization and returns the available doctors to the frontend.

### save_appointment.php

Processes appointment booking requests and saves patient details, uploaded reports, and appointment information into the database.

### test_connection.php

Used to verify that the PHP application can successfully connect to the MySQL database.

### database.sql

Contains the database structure, table definitions, and sample data required to set up the E-First Aid system.


# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/e-first-aid.git
```

## Navigate to the Project Directory

```bash
cd e-first-aid
```

## Run the Application

Open the project using:

```bash
index.html
```

or use VS Code Live Server:

```bash
Right Click → Open with Live Server
```

---

# 🚀 Usage

## Book an Appointment

1. Click **Book Appointment**
2. Enter patient details
3. Upload previous reports (optional)
4. Select specialization
5. Submit appointment request

---

## Access First Aid Assistance

1. Open the **First Aid** card
2. Describe the wound or injury
3. Optionally enable the camera
4. Submit details
5. Receive AI-generated guidance

---

## Schedule a Checkup

1. Open **General Checkup**
2. Select required tests
3. Submit the form

---

## View Doctors

1. Select a medical specialization
2. Browse available doctors
3. View department information

---

# 🔒 Browser Permissions

The application may request:

### Camera Permission

Required for:

* Wound inspection
* First Aid camera functionality

### File Access Permission

Required for:

* Uploading previous medical reports

---

# 🎯 Key Objectives

* Improve accessibility to healthcare services
* Provide quick emergency assistance
* Simplify appointment management
* Deliver first-aid support digitally
* Enhance patient engagement and convenience

---

# 🔮 Future Enhancements

Planned improvements include:

* User Authentication System
* Doctor Dashboard
* Online Video Consultations
* AI Symptom Checker
* Electronic Medical Records (EMR)
* Email Notifications
* SMS Alerts
* Online Payments
* Real-Time Appointment Tracking
* Mobile Application Support

---

# 🤝 Contributing

Contributions are welcome.

To contribute:

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Create a Pull Request

---

# 📜 License

This project is developed for educational and academic purposes.

Copyright © 2026 E-First Aid. All Rights Reserved.

---

# 👨‍💻 Developed By

Antony Rinaldi T

Dedicated to making healthcare services more accessible, efficient, and user-friendly through technology.
