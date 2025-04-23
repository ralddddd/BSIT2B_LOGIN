import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register", 
        { username, password }, 
        { headers: { "Content-Type": "application/json" } }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ 
        p: 4, 
        borderRadius: "16px",
        backgroundColor: 'white'
      }}>
        <Typography variant="h4" align="center">Register</Typography>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <TextField 
          label="Password" 
          type={showPassword ? "text" : "password"} // Toggle between text and password
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                  edge="end"
                  sx={{
                    color: "#1976d2", // Customize icon color
                    "&:hover": {
                      color: "#004ba0", // Darker shade on hover
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleRegister} 
          sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
        >
          REGISTER
        </Button>
        <Typography 
       variant="body2" 
       align="center" 
       sx={{ mt: 2, color: "#333" }} 
        >
         Already have an account?{" "}
      <span 
      onClick={() => navigate("/login")} 
      style={{ 
      color: "#1976d2", 
      cursor: "pointer", 
      textDecoration: "underline", 
      fontWeight: "bold" 
    }}
  >
    Sign in
    </span>
    </Typography>
      </Paper>
    </Container>
  );
};

export default Register;