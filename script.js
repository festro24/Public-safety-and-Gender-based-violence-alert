// ---------------- LOGIN / REGISTRATION ----------------
let isRegisterMode = false;

function toggleAuthMode() {
  const title = document.getElementById("auth-title");
  const button = document.getElementById("auth-button");
  const toggle = document.getElementById("toggle-auth");
  const error = document.getElementById("auth-error");
  error.textContent = "";

  if (!isRegisterMode) {
    isRegisterMode = true;
    title.textContent = "Create a new account";
    button.textContent = "Register";
    toggle.innerHTML = `Already have an account? <a href="#" onclick="toggleAuthMode()">Login here</a>`;
  } else {
    isRegisterMode = false;
    title.textContent = "Login to access safety tools";
    button.textContent = "Login";
    toggle.innerHTML = `Don't have an account? <a href="#" onclick="toggleAuthMode()">Register here</a>`;
  }
}

function handleAuth() {
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  const error = document.getElementById("auth-error");

  if (!username || !password) {
    error.textContent = "Please enter all fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (isRegisterMode) {
    if (users[username]) {
      error.textContent = "Username already exists.";
      return;
    }
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    toggleAuthMode();
  } else {
    if (users[username] && users[username] === password) {
      document.getElementById("auth-screen").classList.add("hidden");
      document.getElementById("main-content").classList.remove("hidden");
    } else {
      error.textContent = "Invalid username or password.";
    }
  }
}

function logout() {
  document.getElementById("main-content").classList.add("hidden");
  document.getElementById("auth-screen").classList.remove("hidden");
}

// ---------------- HELP BUTTON ----------------
function triggerHelp() {
  alert("🚨 If you are in immediate danger, call 10111 or 0800 428 428 for help now.");
}

// ---------------- GOOGLE MAP ----------------
function initMap() {
  const centerSA = { lat: -26.2041, lng: 28.0473 }; // Johannesburg

  const map = new google.maps.Map(document.getElementById("map-container"), {
    zoom: 6,
    center: centerSA,
  });

  // Example markers (replace with real data)
  const locations = [
    { name: "SAPS Johannesburg Central", lat: -26.2041, lng: 28.0473 },
    { name: "POWA Shelter", lat: -26.12, lng: 27.98 },
    { name: "Cape Town SAPS", lat: -33.9249, lng: 18.4241 },
  ];

  locations.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.name,
    });

    const info = new google.maps.InfoWindow({
      content: `<strong>${loc.name}</strong>`,
    });

    marker.addListener("click", () => info.open(map, marker));
  });
}
