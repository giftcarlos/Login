// Login Functionality
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        // Transition to OTP Page immediately
        document.getElementById("login-page").classList.remove("active");
        sendOtp();  // Call OTP sending function
    } else {
        alert("Please enter valid credentials.");
    }
});

// Send OTP Automatically
async function sendOtp() {
    const response = await fetch("/send-otp");
    const result = await response.json();

    if (result.success) {
        // Immediately show OTP page and code-sent message
        document.getElementById("otp-page").classList.add("active");
        document.getElementById("code-sent-message").classList.remove("hidden");
    } else {
        alert("Error sending OTP. Please try again.");
    }
}

// OTP Verification
document.getElementById("otp-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(".otp-box");
    let otp = "";
    inputs.forEach(input => otp += input.value);

    const response = await fetch("/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp })
    });

    const result = await response.json();
    if (result.success) {
        alert("OTP Verified!");
        // Transition to the Home Page immediately after OTP verification
        document.getElementById("otp-page").classList.remove("active");
        document.getElementById("home-page").classList.add("active");
    } else {
        alert("Invalid OTP. Try again.");
    }
});

// Smooth Input Navigation for OTP
const otpInputs = document.querySelectorAll(".otp-box");
otpInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        // Move to the next input field when the user types
        if (e.inputType !== "deleteContentBackward" && input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {
        // Move to the previous input field when the user presses Backspace
        if (e.key === "Backspace" && index > 0 && !input.value) {
            otpInputs[index - 1].focus();
        }
    });
});