CREATE DATABASE IF NOT EXISTS e_first_aid;
USE e_first_aid;

CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(80) NOT NULL,
  available_time VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 4.0,
  qualification VARCHAR(120) NOT NULL DEFAULT '',
  experience_years INT NOT NULL DEFAULT 0,
  hospital VARCHAR(120) NOT NULL DEFAULT '',
  location VARCHAR(120) NOT NULL DEFAULT '',
  consultation_fee DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  languages VARCHAR(120) NOT NULL DEFAULT '',
  profile_summary VARCHAR(255) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(120) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  appointment_time TIME NOT NULL,
  specialization VARCHAR(80) NOT NULL,
  doctor_id INT NOT NULL,
  report_filename VARCHAR(255) DEFAULT NULL,
  status ENUM('past', 'current', 'upcoming') NOT NULL DEFAULT 'upcoming',
  prescription TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_appointments_doctor
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

ALTER TABLE doctors
  ADD COLUMN IF NOT EXISTS rating DECIMAL(2,1) NOT NULL DEFAULT 4.0,
  ADD COLUMN IF NOT EXISTS qualification VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS experience_years INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hospital VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS location VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS consultation_fee DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS languages VARCHAR(120) NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS profile_summary VARCHAR(255) NOT NULL DEFAULT '';

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE doctors;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO doctors (
  name,
  specialization,
  available_time,
  phone,
  rating,
  qualification,
  experience_years,
  hospital,
  location,
  consultation_fee,
  languages,
  profile_summary
) VALUES
  ('Dr. Priya Sharma', 'Cardiology', 'Mon-Fri, 10:00 AM - 2:00 PM', '+91 98765 10001', 4.8, 'MBBS, MD Cardiology', 12, 'City Heart Care Hospital', 'Bengaluru', 900.00, 'English, Hindi, Kannada', 'Specializes in preventive heart care, chest pain evaluation, and ECG review.'),
  ('Dr. Rohan Mehta', 'Cardiology', 'Tue-Sat, 4:00 PM - 8:00 PM', '+91 98765 10002', 4.6, 'MBBS, DM Cardiology', 9, 'Metro Multi Speciality Clinic', 'Mumbai', 850.00, 'English, Hindi, Marathi', 'Focuses on hypertension, cholesterol control, and cardiac follow-up consultations.'),
  ('Dr. Arjun Patel', 'Pediatrics', 'Mon-Sat, 9:00 AM - 1:00 PM', '+91 98765 10003', 4.7, 'MBBS, DCH', 10, 'Little Care Children Hospital', 'Ahmedabad', 650.00, 'English, Hindi, Gujarati', 'Provides child wellness checks, vaccination guidance, and fever care.'),
  ('Dr. Kavya Nair', 'Pediatrics', 'Mon-Fri, 3:00 PM - 6:00 PM', '+91 98765 10004', 4.9, 'MBBS, MD Pediatrics', 11, 'Sunrise Child Health Center', 'Kochi', 700.00, 'English, Malayalam, Hindi', 'Experienced in infant care, nutrition advice, and pediatric emergency assessment.'),
  ('Dr. Sameer Khan', 'Nephrology', 'Mon-Wed-Fri, 11:00 AM - 3:00 PM', '+91 98765 10005', 4.5, 'MBBS, DM Nephrology', 8, 'Renal Care Institute', 'Hyderabad', 1000.00, 'English, Hindi, Urdu', 'Treats kidney disease, high creatinine concerns, and dialysis planning.'),
  ('Dr. Meera Iyer', 'Nephrology', 'Tue-Thu-Sat, 10:00 AM - 1:00 PM', '+91 98765 10006', 4.8, 'MBBS, MD, DNB Nephrology', 14, 'Apex Kidney Center', 'Chennai', 1100.00, 'English, Tamil, Hindi', 'Special interest in diabetic kidney disease and urine abnormality evaluation.'),
  ('Dr. Nikhil Rao', 'Neurology', 'Mon-Fri, 2:00 PM - 6:00 PM', '+91 98765 10007', 4.6, 'MBBS, DM Neurology', 13, 'NeuroLife Hospital', 'Pune', 950.00, 'English, Hindi, Marathi', 'Manages headaches, seizures, nerve pain, and stroke follow-up care.'),
  ('Dr. Ananya Sen', 'Neurology', 'Wed-Sun, 9:30 AM - 12:30 PM', '+91 98765 10008', 4.9, 'MBBS, MD Medicine, DM Neurology', 15, 'Eastern Neuro Center', 'Kolkata', 1050.00, 'English, Hindi, Bengali', 'Known for migraine care, epilepsy management, and neurological second opinions.'),
  ('Dr. Sneha Kapoor', 'Dermatology', 'Mon-Sat, 12:00 PM - 4:00 PM', '+91 98765 10009', 4.7, 'MBBS, MD Dermatology', 7, 'ClearSkin Clinic', 'Delhi', 750.00, 'English, Hindi, Punjabi', 'Treats acne, rashes, allergies, skin infections, and wound-related skin issues.'),
  ('Dr. Vivek Joshi', 'Dermatology', 'Tue-Fri, 5:00 PM - 8:00 PM', '+91 98765 10010', 4.4, 'MBBS, DDVL', 6, 'Glow Dermatology Center', 'Jaipur', 600.00, 'English, Hindi, Rajasthani', 'Provides treatment for eczema, fungal infections, pigmentation, and hair concerns.'),
  ('Dr. Aditya Verma', 'Orthopedics', 'Mon-Fri, 10:00 AM - 5:00 PM', '+91 98765 10011', 4.8, 'MBBS, MS Orthopedics', 16, 'Bone and Joint Hospital', 'Lucknow', 900.00, 'English, Hindi', 'Specializes in fractures, sports injury care, joint pain, and back pain assessment.'),
  ('Dr. Pooja Reddy', 'Orthopedics', 'Sat-Sun, 9:00 AM - 2:00 PM', '+91 98765 10012', 4.6, 'MBBS, DNB Orthopedics', 9, 'ActiveLife Ortho Clinic', 'Hyderabad', 800.00, 'English, Telugu, Hindi', 'Focuses on sprains, ligament injuries, arthritis care, and physiotherapy planning.');
