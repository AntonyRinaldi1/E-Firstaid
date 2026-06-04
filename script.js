const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");
const notificationButton = document.getElementById("notificationButton");
const notificationPanel = document.getElementById("notificationPanel");
const notificationItems = document.querySelectorAll(".notification-item");
const notificationCount = document.getElementById("notificationCount");
const titleFirstAidButton = document.getElementById("titleFirstAidButton");
const openButton = document.getElementById("openbtn");
const closeButton = document.getElementById("closebtn");
const appointmentForm = document.getElementById("appointmentForm");
const contactForm = document.getElementById("contactForm");
const formContainer = document.getElementById("formcontainer1");
const appointmentSpecialization = document.getElementById("appointmentSpecialization");
const appointmentDoctors = document.getElementById("appointmentDoctors");
const firstAidCard = document.getElementById("firstAidCard");
const firstAidModal = document.getElementById("firstAidModal");
const closeFirstAidModal = document.getElementById("closeFirstAidModal");
const firstAidForm = document.getElementById("firstAidForm");
const woundDescription = document.getElementById("woundDescription");
const firstAidSuggestion = document.getElementById("firstAidSuggestion");
const firstAidOpenCameraButton = document.getElementById("firstAidOpenCameraBtn");
const firstAidCloseCameraButton = document.getElementById("firstAidCloseCameraBtn");
const firstAidCameraPreview = document.getElementById("firstAidCameraPreview");
const firstAidCameraStatus = document.getElementById("firstAidCameraStatus");
const generalCheckupCard = document.getElementById("generalCheckupCard");
const generalCheckupModal = document.getElementById("generalCheckupModal");
const closeGeneralCheckupModal = document.getElementById("closeGeneralCheckupModal");
const generalCheckupForm = document.getElementById("generalCheckupForm");
const generalCheckupMessage = document.getElementById("generalCheckupMessage");
const doctorCategoryCards = document.querySelectorAll(".doctor-category");
const doctorListModal = document.getElementById("doctorListModal");
const closeDoctorListModal = document.getElementById("closeDoctorListModal");
const doctorListTitle = document.getElementById("doctorListTitle");
const doctorListIntro = document.getElementById("doctorListIntro");
const doctorList = document.getElementById("doctorList");
const doctorApiUrl = "get_doctors.php";
const appointmentApiUrl = "save_appointment.php";

const firstAidCamera = {
  stream: null,
  openButton: firstAidOpenCameraButton,
  closeButton: firstAidCloseCameraButton,
  preview: firstAidCameraPreview,
  status: firstAidCameraStatus
};

let notificationAudioContext = null;

function playNotificationSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  notificationAudioContext = notificationAudioContext || new AudioContext();

  if (notificationAudioContext.state === "suspended") {
    notificationAudioContext.resume();
  }

  const oscillator = notificationAudioContext.createOscillator();
  const gain = notificationAudioContext.createGain();
  const now = notificationAudioContext.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, now);
  oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.14);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  oscillator.connect(gain);
  gain.connect(notificationAudioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.2);
}

function animateNotificationButton() {
  notificationButton.classList.remove("ring");
  void notificationButton.offsetWidth;
  notificationButton.classList.add("ring");
}

function setNotificationPanelOpen(isOpen) {
  notificationPanel.classList.toggle("open", isOpen);
  notificationPanel.setAttribute("aria-hidden", String(!isOpen));
  notificationButton.setAttribute("aria-expanded", String(isOpen));
}

function setAppointmentFormOpen(isOpen) {
  formContainer.classList.toggle("open", isOpen);
  formContainer.setAttribute("aria-hidden", String(!isOpen));
}

function setFirstAidModuleOpen(isOpen) {
  firstAidModal.classList.toggle("open", isOpen);
  firstAidModal.setAttribute("aria-hidden", String(!isOpen));

  if (!isOpen) {
    stopCamera(firstAidCamera);
    firstAidSuggestion.innerHTML = "";
    firstAidForm.reset();
  }
}

function setGeneralCheckupModuleOpen(isOpen) {
  generalCheckupModal.classList.toggle("open", isOpen);
  generalCheckupModal.setAttribute("aria-hidden", String(!isOpen));

  if (!isOpen) {
    generalCheckupMessage.textContent = "";
  }
}

function setDoctorListModuleOpen(isOpen) {
  doctorListModal.classList.toggle("open", isOpen);
  doctorListModal.setAttribute("aria-hidden", String(!isOpen));
}

function setCameraButtonLabel(button, label) {
  const labelElement = button.querySelector(".camera-label");

  if (labelElement) {
    labelElement.textContent = label;
  } else {
    button.textContent = label;
  }
}

async function openCamera(camera) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    camera.status.textContent = "Camera is not supported in this browser.";
    return;
  }

  try {
    camera.status.textContent = "Opening camera...";
    camera.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    camera.preview.srcObject = camera.stream;
    camera.preview.hidden = false;
    camera.closeButton.hidden = false;
    setCameraButtonLabel(camera.openButton, "Camera Opened");
    camera.openButton.disabled = true;
    camera.status.textContent = "Camera is active.";
  } catch (error) {
    camera.status.textContent = "Please allow camera permission to use this option.";
  }
}

function stopCamera(camera) {
  if (camera.stream) {
    camera.stream.getTracks().forEach((track) => track.stop());
    camera.stream = null;
  }

  camera.preview.srcObject = null;
  camera.preview.hidden = true;
  camera.closeButton.hidden = true;
  camera.openButton.disabled = false;
  setCameraButtonLabel(camera.openButton, "Open Camera");
  camera.status.textContent = "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderDoctorList(doctors) {
  if (doctors.length === 0) {
    doctorList.innerHTML = '<p class="empty-state">No doctors are available for this specialization right now.</p>';
    return;
  }

  doctorList.innerHTML = doctors.map((doctor) => `
    <article class="doctor-result-card">
      <h3>${escapeHtml(doctor.name)}</h3>
      <div class="doctor-rating" aria-label="Rating ${escapeHtml(doctor.rating)} out of 5">
        <span class="rating-stars" aria-hidden="true">*****</span>
        <span>${escapeHtml(doctor.rating)} / 5</span>
      </div>
      <p><strong>Specialization:</strong> ${escapeHtml(doctor.specialization)}</p>
      <p><strong>Qualification:</strong> ${escapeHtml(doctor.qualification)}</p>
      <p><strong>Experience:</strong> ${escapeHtml(doctor.experience_years)} years</p>
      <p><strong>Hospital:</strong> ${escapeHtml(doctor.hospital)}, ${escapeHtml(doctor.location)}</p>
      <p><strong>Available:</strong> ${escapeHtml(doctor.available_time)}</p>
      <p><strong>Fee:</strong> Rs. ${escapeHtml(doctor.consultation_fee)}</p>
      <p><strong>Languages:</strong> ${escapeHtml(doctor.languages)}</p>
      <p>${escapeHtml(doctor.profile_summary)}</p>
      <a href="tel:${escapeHtml(doctor.phone)}">Call ${escapeHtml(doctor.phone)}</a>
    </article>
  `).join("");
}

function renderAppointmentDoctors(doctors) {
  if (doctors.length === 0) {
    appointmentDoctors.innerHTML = '<p class="form-message">No doctors are available for this specialization.</p>';
    return;
  }

  appointmentDoctors.innerHTML = `
    <fieldset class="appointment-doctor-options">
      <legend>Choose doctor</legend>
      ${doctors.map((doctor) => `
        <label class="doctor-choice">
          <input type="radio" name="appointmentDoctor" value="${escapeHtml(doctor.id)}" required>
          <span>
            <strong>${escapeHtml(doctor.name)}</strong>
            <small>${escapeHtml(doctor.qualification)} | ${escapeHtml(doctor.experience_years)} years</small>
            <small>${escapeHtml(doctor.hospital)}, ${escapeHtml(doctor.location)}</small>
            <small>${escapeHtml(doctor.available_time)} | Rating ${escapeHtml(doctor.rating)} / 5 | Rs. ${escapeHtml(doctor.consultation_fee)}</small>
          </span>
        </label>
      `).join("")}
    </fieldset>
  `;
}

function buildFirstAidSuggestion(description) {
  const text = description.toLowerCase();
  const isSevere = /heavy|severe|deep|spurting|gushing|artery|uncontrolled|large|glass|knife|metal|object|dirty|animal|bite|burn|faint|dizzy|numb|bone/.test(text);
  const isBurn = /burn|hot|fire|oil|steam|chemical/.test(text);
  const isBite = /bite|animal|dog|cat|human/.test(text);
  const isDogBite = /dog|puppy/.test(text);
  const isCatBite = /cat|kitten/.test(text);
  const isBatExposure = /bat/.test(text);
  const isMonkeyBite = /monkey|macaque|primate/.test(text);
  const isRatBite = /rat|mouse|rodent/.test(text);
  const isSnakeBite = /snake|cobra|viper/.test(text);
  const isAnimalBite = /animal|dog|puppy|cat|kitten|monkey|macaque|primate|bat|rat|mouse|rodent|snake|cobra|viper|bite|scratch/.test(text) && !/human/.test(text);
  const isBleedingBite = /bleed|bleeding|blood|deep|puncture|torn|open/.test(text);
  const isMinor = /small|minor|scratch|scrape|cut/.test(text) && !isSevere;

  if (isBurn) {
    return {
      title: "AI First Aid Guide: Burn Care",
      steps: [
        "Move away from the heat source and remove tight items near the burned area if they are not stuck to the skin.",
        "Cool the burn under cool running water for about 20 minutes.",
        "Cover the area with a clean, non-stick dressing or clean cloth.",
        "Do not apply ice, butter, toothpaste, or oily creams.",
        "Get medical help if the burn is large, deep, chemical/electrical, on the face/genitals/hands, or the person feels unwell."
      ]
    };
  }

  if (isSnakeBite) {
    return {
      title: "AI First Aid Guide: Snake Bite Technique",
      steps: [
        "Call emergency help immediately and keep the person still.",
        "Move away from the snake. Do not try to catch or kill it.",
        "Keep the bitten limb still and at or slightly below heart level.",
        "Remove rings, watches, tight clothing, or shoes near the bite before swelling starts.",
        "Cover the bite with a clean, dry dressing.",
        "Do not cut the wound, suck venom, apply ice, drink alcohol/caffeine, or use a tight tourniquet."
      ]
    };
  }

  if (isDogBite) {
    return {
      title: "AI First Aid Guide: Dog Bite Technique",
      steps: [
        "Get away from the dog and move to a safe place.",
        "If bleeding is heavy, apply firm direct pressure with clean cloth or gauze.",
        "Wash the wound under running water with soap for 15 minutes.",
        "Apply antiseptic if available, then cover with a clean sterile dressing.",
        "Visit a doctor or animal bite clinic for rabies risk, tetanus status, and antibiotic assessment.",
        "If possible, note whether the dog is known, vaccinated, stray, sick-looking, or available for observation."
      ]
    };
  }

  if (isCatBite) {
    return {
      title: "AI First Aid Guide: Cat Bite Technique",
      steps: [
        "Wash the bite or scratch with soap and running water for 15 minutes.",
        "Apply gentle pressure if there is bleeding.",
        "Apply antiseptic and cover with a clean dressing.",
        "Do not ignore small puncture marks; cat bites can push bacteria deep into tissue.",
        "Seek medical care the same day, especially for bites on hands, fingers, face, joints, or if swelling/redness begins.",
        "Ask the doctor about tetanus, rabies risk, and whether antibiotics are needed."
      ]
    };
  }

  if (isBatExposure) {
    return {
      title: "AI First Aid Guide: Bat Exposure Technique",
      steps: [
        "Wash any possible bite, scratch, or saliva contact area with soap and running water for 15 minutes.",
        "Seek medical advice urgently even if you cannot see a bite mark.",
        "Do not wait for symptoms; rabies prevention works before symptoms appear.",
        "If safe, close the room and contact local animal control/public health for guidance about the bat.",
        "Do not handle the bat with bare hands.",
        "A clinician may recommend rabies post-exposure treatment depending on the exposure."
      ]
    };
  }

  if (isMonkeyBite) {
    return {
      title: "AI First Aid Guide: Monkey Bite Technique",
      steps: [
        "Move away from the monkey and do not try to feed or touch it again.",
        "Wash the bite or scratch thoroughly with soap and running water for at least 20 minutes.",
        "Apply pressure with clean cloth if bleeding continues.",
        "Apply antiseptic and cover with a sterile dressing.",
        "Go to a hospital or animal bite clinic urgently for rabies, tetanus, antibiotic, and monkey-related infection assessment.",
        "Tell the clinician where the bite happened and whether it was a macaque or wild monkey."
      ]
    };
  }

  if (isRatBite) {
    return {
      title: "AI First Aid Guide: Rat or Rodent Bite Technique",
      steps: [
        "Wash the bite with soap and running water for 15 minutes.",
        "Apply gentle direct pressure if it is bleeding.",
        "Use antiseptic if available and cover with a clean dressing.",
        "Seek medical care because rodent bites can cause infection, including rat-bite fever.",
        "Watch for fever, rash, joint pain, vomiting, swelling, pus, or worsening redness in the following days.",
        "Tell the doctor whether it was a pet, wild, laboratory, or unknown rodent."
      ]
    };
  }

  if (isAnimalBite) {
    const steps = [
      "Move away from the animal and get to a safe place first.",
      "Wash the bite or scratch immediately with soap and running water for 15 minutes.",
      "If it is bleeding, press clean gauze or cloth directly on the wound until bleeding slows.",
      "After washing, apply an antiseptic such as povidone-iodine if available.",
      "Cover the wound with a clean, loose sterile dressing.",
      "Go to a doctor, hospital, or animal bite clinic as soon as possible for rabies risk assessment, tetanus booster check, and possible antibiotics."
    ];

    if (isBleedingBite) {
      steps.splice(3, 0, "If bleeding is heavy or does not stop after steady pressure, call emergency help and keep pressure on the wound.");
    }

    return {
      title: "AI First Aid Guide: Animal Bite Technique",
      steps
    };
  }

  if (isBite) {
    return {
      title: "AI First Aid Guide: Bite Wound",
      steps: [
        "Wash your hands or use sanitizer before touching the wound.",
        "If bleeding is present, apply steady pressure with clean cloth or gauze.",
        "Rinse the wound gently with clean running water.",
        "Cover with a sterile dressing or clean bandage.",
        "Contact a doctor soon because bite wounds can need tetanus assessment or antibiotics."
      ]
    };
  }

  if (isSevere) {
    return {
      title: "AI First Aid Guide: Serious Bleeding or Deep Wound",
      steps: [
        "Call emergency help immediately if bleeding is heavy, deep, spurting, or will not stop.",
        "Apply firm, direct pressure with clean gauze or cloth.",
        "Keep pressure on the wound. If blood soaks through, add another cloth on top and continue pressure.",
        "Keep the injured area raised if possible and help the person stay still.",
        "Do not remove embedded objects. Apply pressure around the object and wait for medical help."
      ]
    };
  }

  return {
    title: isMinor ? "AI First Aid Guide: Minor Cut or Scrape" : "AI First Aid Guide: Basic Wound Care",
    steps: [
      "Wash your hands before touching the wound.",
      "Apply gentle pressure with clean gauze or cloth until bleeding stops.",
      "Rinse the wound with clean running water and remove visible dirt carefully.",
      "Apply a thin layer of antiseptic or antibiotic ointment if available and suitable.",
      "Cover with a clean bandage and change it daily or whenever it becomes wet or dirty.",
      "Watch for infection signs such as spreading redness, swelling, pus, fever, or increasing pain."
    ]
  };
}

function renderFirstAidSuggestion(description) {
  const suggestion = buildFirstAidSuggestion(description);

  firstAidSuggestion.innerHTML = `
    <div class="ai-suggestion-card">
      <h3>${escapeHtml(suggestion.title)}</h3>
      <ol>
        ${suggestion.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
      <div class="ai-warning">
        This is first-aid guidance only. Call emergency services or visit a hospital for severe bleeding, deep wounds, embedded objects, animal bites, burns, numbness, fainting, or signs of infection.
      </div>
    </div>
  `;
}

async function loadAppointmentDoctors(specialization) {
  if (!specialization) {
    appointmentDoctors.innerHTML = '<p class="form-message">Select a specialization to see available doctors.</p>';
    return;
  }

  appointmentDoctors.innerHTML = '<p class="form-message">Loading doctors...</p>';

  try {
    if (window.location.protocol === "file:") {
      throw new Error("Open this page from localhost to load doctors.");
    }

    const response = await fetch(`${doctorApiUrl}?specialization=${encodeURIComponent(specialization)}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to load doctors.");
    }

    renderAppointmentDoctors(data.doctors);
  } catch (error) {
    appointmentDoctors.innerHTML = `
      <p class="form-message">
        ${escapeHtml(error.message)} Start Apache and MySQL in XAMPP, then open this project from http://localhost/mini%20project/.
      </p>
    `;
  }
}

async function loadDoctorsBySpecialization(specialization) {
  doctorListTitle.textContent = `${specialization} Doctors`;
  doctorListIntro.textContent = "Loading available doctors...";
  doctorList.innerHTML = "";
  setDoctorListModuleOpen(true);

  try {
    if (window.location.protocol === "file:") {
      throw new Error("Open the project through Apache, not directly as a file.");
    }

    const response = await fetch(`${doctorApiUrl}?specialization=${encodeURIComponent(specialization)}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to load doctors.");
    }

    doctorListIntro.textContent = `Showing doctors filtered by ${specialization}.`;
    renderDoctorList(data.doctors);
  } catch (error) {
    doctorListIntro.textContent = "Doctor database is not connected yet.";
    doctorList.innerHTML = `
      <p class="empty-state">
        ${escapeHtml(error.message)}
      </p>
      <p class="empty-state">
        Start Apache and MySQL in XAMPP, then open this project from http://localhost/mini%20project/.
      </p>
    `;
  }
}

menuButton.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");

  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

notificationButton.addEventListener("click", () => {
  const isOpen = !notificationPanel.classList.contains("open");

  setNotificationPanelOpen(isOpen);
  playNotificationSound();
  animateNotificationButton();
});

notificationItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.remove("unread");
    item.classList.add("active");
    playNotificationSound();
    animateNotificationButton();

    const unreadCount = document.querySelectorAll(".notification-item.unread").length;
    notificationCount.textContent = String(unreadCount);
    notificationCount.hidden = unreadCount === 0;
  });
});

menu.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    menu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (event) => {
  const clickedNotification = notificationPanel.contains(event.target) || notificationButton.contains(event.target);
  const clickedMenu = menu.contains(event.target) || menuButton.contains(event.target);

  if (!clickedNotification) {
    setNotificationPanelOpen(false);
  }

  if (!clickedMenu) {
    menu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

openButton.addEventListener("click", () => {
  setAppointmentFormOpen(true);
});

titleFirstAidButton.addEventListener("click", () => {
  setFirstAidModuleOpen(true);
});

closeButton.addEventListener("click", () => {
  setAppointmentFormOpen(false);
});

appointmentSpecialization.addEventListener("change", () => {
  loadAppointmentDoctors(appointmentSpecialization.value);
});

firstAidCard.addEventListener("click", () => {
  setFirstAidModuleOpen(true);
});

firstAidCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setFirstAidModuleOpen(true);
  }
});

closeFirstAidModal.addEventListener("click", () => {
  setFirstAidModuleOpen(false);
});

firstAidModal.addEventListener("click", (event) => {
  if (event.target === firstAidModal) {
    setFirstAidModuleOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && firstAidModal.classList.contains("open")) {
    setFirstAidModuleOpen(false);
  }

  if (event.key === "Escape" && generalCheckupModal.classList.contains("open")) {
    setGeneralCheckupModuleOpen(false);
  }

  if (event.key === "Escape" && doctorListModal.classList.contains("open")) {
    setDoctorListModuleOpen(false);
  }
});

firstAidOpenCameraButton.addEventListener("click", () => openCamera(firstAidCamera));
firstAidCloseCameraButton.addEventListener("click", () => stopCamera(firstAidCamera));

generalCheckupCard.addEventListener("click", () => {
  setGeneralCheckupModuleOpen(true);
});

generalCheckupCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setGeneralCheckupModuleOpen(true);
  }
});

closeGeneralCheckupModal.addEventListener("click", () => {
  setGeneralCheckupModuleOpen(false);
});

generalCheckupModal.addEventListener("click", (event) => {
  if (event.target === generalCheckupModal) {
    setGeneralCheckupModuleOpen(false);
  }
});

closeDoctorListModal.addEventListener("click", () => {
  setDoctorListModuleOpen(false);
});

doctorListModal.addEventListener("click", (event) => {
  if (event.target === doctorListModal) {
    setDoctorListModuleOpen(false);
  }
});

doctorCategoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    loadDoctorsBySpecialization(card.dataset.specialization);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      loadDoctorsBySpecialization(card.dataset.specialization);
    }
  });
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDoctor = appointmentForm.querySelector("input[name='appointmentDoctor']:checked");

  if (!selectedDoctor) {
    const existingMessage = appointmentDoctors.querySelector(".appointment-error");

    if (existingMessage) {
      existingMessage.textContent = "Please choose one doctor for the appointment.";
    } else {
      appointmentDoctors.insertAdjacentHTML("beforeend", '<p class="form-message appointment-error">Please choose one doctor for the appointment.</p>');
    }

    return;
  }

  saveAppointment();
});

async function saveAppointment() {
  if (window.location.protocol === "file:") {
    appointmentDoctors.insertAdjacentHTML("beforeend", '<p class="form-message appointment-error">Open this page from localhost to save appointments.</p>');
    return;
  }

  const submitButton = appointmentForm.querySelector("button[type='submit']");
  const formData = new FormData(appointmentForm);

  submitButton.disabled = true;
  submitButton.textContent = "Saving...";

  try {
    const response = await fetch(appointmentApiUrl, {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Could not save appointment.");
    }

    alert(`Appointment saved successfully. Appointment ID: ${data.appointment_id}`);
    appointmentForm.reset();
    appointmentDoctors.innerHTML = '<p class="form-message">Select a specialization to see available doctors.</p>';
    setAppointmentFormOpen(false);
  } catch (error) {
    const existingMessage = appointmentDoctors.querySelector(".appointment-error");

    if (existingMessage) {
      existingMessage.textContent = error.message;
    } else {
      appointmentDoctors.insertAdjacentHTML("beforeend", `<p class="form-message appointment-error">${escapeHtml(error.message)}</p>`);
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Book Appointment";
  }
}

firstAidForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderFirstAidSuggestion(woundDescription.value);
});

generalCheckupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedCheckups = generalCheckupForm.querySelectorAll("input[name='checkupType']:checked");

  if (selectedCheckups.length === 0) {
    generalCheckupMessage.textContent = "Please select at least one checkup type.";
    return;
  }

  alert("General checkup details submitted successfully.");
  generalCheckupForm.reset();
  setGeneralCheckupModuleOpen(false);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Message sent successfully!");
  contactForm.reset();
});
