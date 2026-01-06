function isEmail(value) {
  return value.includes("@");
}

function isPhone(value) {
  return /^\d{10}$/.test(value);
}

/* SIGN UP */
function signup() {
  const user = signupUser.value.trim();
  const password = signupPassword.value;

  if (!user || !password) {
    alert("All fields are required");
    return;
  }

  if (!isEmail(user) && !isPhone(user)) {
    alert("Enter a valid email or 10-digit mobile number");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  localStorage.setItem("user", JSON.stringify({
    user,
    password
  }));

  alert("Account created successfully");
  window.location = "index.html";
}

/* LOGIN */
function login() {
  const userInput = loginUser.value.trim();
  const passwordInput = loginPassword.value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please sign up.");
    return;
  }

  if (
    savedUser.user === userInput &&
    savedUser.password === passwordInput
  ) {
    localStorage.setItem("auth", "true");
    window.location = "dashboard.html";
  } else {
    alert("Invalid login credentials");
  }
}
