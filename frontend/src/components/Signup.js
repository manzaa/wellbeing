import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Snackbar,
  Alert,
  LinearProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState(generateCaptcha());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const navigate = useNavigate();

  // Generate CAPTCHA question
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, answer: num1 + num2 };
  }

  // Password strength calculation logic
  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push("Password must be at least 8 characters long.");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("Include at least one uppercase letter.");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("Include at least one lowercase letter.");

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("Include at least one number.");

    if (/[@$!%*?&#]/.test(password)) score += 1;
    else feedback.push("Include at least one special character (@, $, !, %, *, ?, &, #).");

    setPasswordStrength((score / 5) * 100); // Strength as percentage
    setPasswordFeedback(feedback.join(" "));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate CAPTCHA
    if (parseInt(captchaInput) !== captchaQuestion.answer) {
      setSnackbarMessage("CAPTCHA validation failed. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setCaptchaQuestion(generateCaptcha()); // Reset CAPTCHA
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (passwordStrength < 80) {
      setSnackbarMessage("Password strength is insufficient. Please meet all requirements.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // API call example
      await axios.post(process.env.REACT_APP_API_URL + "/api/signup", {
        username,
        email,
        password: hashedPassword,
      });

      setSnackbarMessage("Signup successful! Please check your email for verification.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect after 3 seconds

      // Reset form fields
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCaptchaInput("");
      setCaptchaQuestion(generateCaptcha());
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || "Signup failed");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={handlePasswordChange}
            sx={{ mb: 1 }}
          />
          <Box sx={{ mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    passwordStrength >= 80 ? "#4caf50" : passwordStrength >= 50 ? "#ffc107" : "#f44336",
                },
              }}
            />
            <Typography variant="body2" color="textSecondary">
              {passwordFeedback}
            </Typography>
          </Box>
          <TextField
            label="Confirm Password"
            fullWidth
            variant="outlined"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* CAPTCHA */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Solve this: {captchaQuestion.num1} + {captchaQuestion.num2} = ?
            </Typography>
            <TextField
              label="Enter your answer"
              variant="outlined"
              fullWidth
              required
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
            />
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </form>
        <Typography align="center" style={{ marginTop: "10px" }}>
          Already have an account? <a href="/">Login</a>
        </Typography>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
