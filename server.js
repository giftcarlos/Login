const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

let generatedOTP;

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "jameshalvorson000@gmail.com", // Use your email
        pass: "usrh veop prwt ryub"          // Use your email password
    }
});

// Route to send OTP
app.get("/send-otp", (req, res) => {
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const mailOptions = {
        from: "jameshalvorson000@gmail.com",
        to: "giftstewart816@gmail.com",
        subject: "Your OTP Code",
        text: `Your OTP code is ${generatedOTP}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.json({ success: false });
        } else {
            console.log("Email sent:", info.response);
            res.json({ success: true });
        }
    });
});

// Route to verify OTP
app.post("/verify", (req, res) => {
    const { otp } = req.body;
    if (otp === generatedOTP) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});