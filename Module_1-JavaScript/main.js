// =========================================
// Task 1: JavaScript Basics & Setup
// The HTML page loads this external file using <script src="main.js"></script>.

console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Community page is fully loaded");
});

// =========================================
// Task 2: Syntax, Data Types, and Operators
// ==========================================
const featuredEventName = "Music Night";
const featuredEventDate = "2026-06-18";
let featuredEventSeats = 24;

console.log(`${featuredEventName} is scheduled on ${featuredEventDate}. Seats available: ${featuredEventSeats}`);
featuredEventSeats--;
console.log(`After one sample registration, seats left: ${featuredEventSeats}`);

// =================================
// Task 5: Objects and Prototypes
// ================================
class EventItem {
    constructor(id, name, date, category, location, seats, fee = "Free") {
        this.id = id;
        this.name = name;
        this.date = date;
        this.category = category;
        this.location = location;
        this.seats = seats;
        this.fee = fee;
    }
}

EventItem.prototype.checkAvailability = function () {
    const today = new Date();
    const eventDate = new Date(this.date);
    return eventDate >= today && this.seats > 0;
};

// Object.entries() lists object keys and values for inspection
function logEventDetails(eventItem) {
    Object.entries(eventItem).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}

// ==========================
// Task 6: Arrays and Methods
// ==========================
const events = [
    new EventItem(1, "Food Drive", "2026-06-12", "Food", "Community Hall", 18),
    new EventItem(2, "Music Night", "2026-06-18", "Music", "Town Park", 24, "INR 250"),
    new EventItem(3, "Art Fair", "2026-06-22", "Art", "Main Street", 12, "INR 150"),
    new EventItem(4, "Health Camp", "2026-06-25", "Health", "Primary School", 20),
    new EventItem(5, "Tree Planting", "2026-07-03", "Environment", "Lake Road", 30),
    new EventItem(6, "Book Exchange", "2026-07-09", "Education", "Public Library", 16)
];

events.push(new EventItem(7, "Workshop on Baking", "2026-07-15", "Food", "Skill Center", 10, "INR 100"));

const musicEvents = events.filter((eventItem) => eventItem.category === "Music");
console.log("Music events:", musicEvents);

const formattedEventCards = events.map((eventItem) => `${eventItem.name} on ${eventItem.date}`);
console.log("Formatted display cards:", formattedEventCards);

logEventDetails(events[0]);

// ============================================================
// Task 4: Functions, Scope, Closures, Higher-Order Functions
// Reusable functions keep event operations clear. The closure tracks category
// registration totals without exposing the counter globally.
// ============================================================
function addEvent(eventItem) {
    events.push(eventItem);
    renderEvents();
}

function createCategoryRegistrationTracker(category) {
    let totalRegistrations = 0;

    return function trackRegistration(eventItem) {
        if (eventItem.category === category) {
            totalRegistrations++;
        }

        return totalRegistrations;
    };
}

const trackMusicRegistrations = createCategoryRegistrationTracker("Music");

function filterEventsByCategory(category = "All", callback = (eventItem) => eventItem) {
    const clonedEvents = [...events];
    const filteredEvents = category === "All"
        ? clonedEvents
        : clonedEvents.filter((eventItem) => eventItem.category === category);

    return filteredEvents.map(callback);
}

function registerUser(eventId) {
    try {
        const eventItem = events.find((item) => item.id === Number(eventId));

        if (!eventItem) {
            throw new Error("Selected event was not found.");
        }

        if (!eventItem.checkAvailability()) {
            throw new Error(`${eventItem.name} is full or no longer available.`);
        }

        eventItem.seats--;

        if (eventItem.category === "Music") {
            console.log(`Music registrations: ${trackMusicRegistrations(eventItem)}`);
        }

        renderEvents();
        return `${eventItem.name} registration successful. Seats left: ${eventItem.seats}`;
    } catch (error) {
        console.error("Registration error:", error.message);
        return error.message;
    }
}

// ==================================
// Task 7: DOM Manipulation
// ====================================
const eventCards = document.querySelector("#eventCards");

const categoryFilter = document.querySelector("#categoryFilter");
const searchInput = document.querySelector("#searchInput");
const loadingSpinner = document.querySelector("#loadingSpinner");

const registrationForm = document.querySelector("#registrationForm");
const confirmation = document.querySelector("#confirmation");

const video = document.querySelector("video");

function createEventCard(eventItem) {

    const card = document.createElement("article");
    card.className = `event-card${eventItem.seats === 0 ? " full" : ""}`;

    const title = document.createElement("h3");
    title.textContent = eventItem.name;

    const details = document.createElement("p");
    details.textContent = `${eventItem.category} | ${eventItem.location} | ${eventItem.date}`;

    const seats = document.createElement("p");
    seats.textContent = `Seats available: ${eventItem.seats}`;

    const fee = document.createElement("p");
    fee.textContent = `Fee: ${eventItem.fee}`;

    const registerButton = document.createElement("button");
    registerButton.type = "button";
    registerButton.textContent = eventItem.seats > 0 ? "Register" : "Full";
    registerButton.disabled = eventItem.seats === 0;

    // Task 8: onclick handles each dynamic Register button.
    registerButton.onclick = () => {
        confirmation.textContent = registerUser(eventItem.id);
    };

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel Seat";
    cancelButton.onclick = () => cancelRegistration(eventItem.id);

   card.appendChild(title);
    card.appendChild(details);
     card.appendChild(seats);
    card.appendChild(fee);
    card.appendChild(registerButton);
    card.appendChild(cancelButton);

    return card;
}

function renderEvents(list = events) {
    if (!eventCards) {
        return;
    }

    eventCards.innerHTML = "";

    list.forEach((eventItem) => {
        // Task 3: if-else hides past or full events from the main display.
        if (eventItem.checkAvailability()) {
            eventCards.appendChild(createEventCard(eventItem));
        } else {
            console.log(`${eventItem.name} is hidden because it is full or past.`);
        }
    });
}

function cancelRegistration(eventId) {
    const eventItem = events.find((item) => item.id === Number(eventId));

    if (eventItem) {
        eventItem.seats++;
        confirmation.textContent = `Cancelled one seat for ${eventItem.name}. Seats available: ${eventItem.seats}`;
        renderEvents();
    }
}

// ========================
// Task 8: Event Handling
// =========================
function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredEvents = filterEventsByCategory(selectedCategory, (eventItem) => eventItem)
        .filter((eventItem) => eventItem.name.toLowerCase().includes(searchTerm));

    renderEvents(filteredEvents);
}

categoryFilter.addEventListener("change", applyFilters);

searchInput.addEventListener("keydown", () => {
    setTimeout(applyFilters, 0);
});

// ========================================
// Task 9: Async JS, Promises, Async/Await
// ========================================
const mockEventsEndpoint = "https://jsonplaceholder.typicode.com/posts?_limit=3";

function fetchEventsWithThen() {
    fetch(mockEventsEndpoint)
        .then((response) => response.json())
        .then((data) => console.log("Mock events loaded with .then():", data))
        .catch((error) => console.error("Mock event fetch failed:", error));
}

async function loadEventsAsync() {
    loadingSpinner.classList.add("is-visible");

    try {
        const response = await fetch(mockEventsEndpoint);
        const remoteEvents = await response.json();
        console.log("Mock events loaded with async/await:", remoteEvents);
    } catch (error) {
        console.warn("Using local event data because the mock API failed.", error);
    } finally {
        loadingSpinner.classList.remove("is-visible");
        renderEvents();
    }
}

// =====================================
// Task 10: Modern JavaScript Features
// =====================================
function summarizeEvent({ name, date, category }, prefix = "Upcoming event") {
    return `${prefix}: ${name} (${category}) on ${date}`;
}

console.log(summarizeEvent(events[1]));

//=================================
// Task 11: Working with Forms
// =================================
function validatePhone() {
    const phoneInput = document.querySelector("#phone");
    const phoneError = document.querySelector("#phoneError");
    const isValid = /^[0-9]{10}$/.test(phoneInput.value.trim());

    phoneError.textContent = isValid ? "" : "Enter a valid 10 digit phone number.";
    return isValid;
}

function validateRegistrationForm(form) {
    const { name, email, eventType } = form.elements;

    if (!name.value.trim() || !email.value.trim() || !eventType.value) {
        confirmation.textContent = "Please complete name, email, and event type.";
        return false;
    }

    if (!validatePhone()) {
        return false;
    }

    return true;
}

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submit started.");

    if (!validateRegistrationForm(registrationForm)) {
        console.log("Form validation failed.");
        return;
    }

    const formData = {
        name: registrationForm.elements.name.value.trim(),
        email: registrationForm.elements.email.value.trim(),
        eventType: registrationForm.elements.eventType.value
    };

    console.log("Form payload:", formData);
    postRegistration(formData);
});

function confirmRegistration() {
    console.log("Register button clicked.");
}

// ===============================
// Task 12: AJAX & Fetch API
// ==============================
function postRegistration(formData) {
    confirmation.textContent = "Submitting registration...";

    setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server rejected the registration.");
                }

                return response.json();
            })
            .then((data) => {
                console.log("Fetch request payload checked:", formData);
                console.log("Mock API response:", data);
                confirmation.textContent = `Thank you, ${formData.name}. You are registered for ${formData.eventType}.`;
            })
            .catch((error) => {
                console.error("Registration request failed:", error);
                confirmation.textContent = "Registration could not be sent. Please try again.";
            });
    }, 800);
}

// ============================================================
// Task 13: Debugging and Testing
// Console logs above mark submit steps and payloads. In Chrome DevTools, place
// breakpoints inside registerUser(), validateRegistrationForm(), and
// postRegistration() to inspect variables and the Network request.
// ============================================================

// ============================================================
// Task 14: jQuery and JS Frameworks
// jQuery can simplify selectors, click handling, and animation. Frameworks like
// React or Vue help by organizing large UIs into reusable state-driven
// components.
// ============================================================
if (window.jQuery) {
    $("#registerBtn").click(() => {
        $("#confirmation").fadeOut(100).fadeIn(250);
    });

    $(".event-img").on("mouseenter", function () {
        $(this).fadeOut(100).fadeIn(200);
    });
}

// Extra portal helpers used by the existing HTML attributes.
function showEventFee() {
    const eventType = document.querySelector("#eventType");
    const feeDisplay = document.querySelector("#feeDisplay");
    const selectedOption = eventType.options[eventType.selectedIndex];

    feeDisplay.textContent = selectedOption.dataset.fee
        ? `Fee: ${selectedOption.dataset.fee}`
        : "";
}

function savePreference() {
    const eventType = document.querySelector("#eventType");
    localStorage.setItem("preferredEventType", eventType.value);
}

function clearPreferences() {
    localStorage.clear();
    document.querySelector("#eventType").value = "";
    document.querySelector("#feeDisplay").textContent = "";
    confirmation.textContent = "Saved preferences cleared.";
}

function countCharacters() {
    const message = document.querySelector("#message");
    document.querySelector("#charCount").textContent = `${message.value.length} characters`;
}

function enlargeImage(image) {
    const isLarge = image.style.maxWidth === "420px";
    image.style.maxWidth = isLarge ? "260px" : "420px";
    image.style.height = isLarge ? "150px" : "230px";
}

function findNearbyEvents() {
    const locationResult = document.querySelector("#locationResult");

    if (!navigator.geolocation) {
        locationResult.textContent = "Geolocation is not supported by this browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            locationResult.textContent = `Nearby events searched at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}.`;
        },
        () => {
            locationResult.textContent = "Location access was not allowed.";
        }
    );
}

if (video) {
    video.addEventListener("canplay", () => {
        document.querySelector("#videoStatus").textContent = "Video invite is ready to play.";
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const savedEventType = localStorage.getItem("preferredEventType");

    if (savedEventType) {
        document.querySelector("#eventType").value = savedEventType;
        showEventFee();
    }

    fetchEventsWithThen();
    loadEventsAsync();
});
