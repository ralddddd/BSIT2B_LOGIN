import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          textAlign: "center", 
          p: 3, 
          borderRadius:"16px", 
          boxShadow: 3, 
          backgroundColor: "#f9f9f9" 
        }}
      >
        <Typography variant="h4" sx={{ color: "#333", mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor: "white" }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle between text and password
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          sx={{ backgroundColor: "white" }}
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
          onClick={handleLogin}
          sx={{ mt: 2, borderRadius: "8px", textTransform: "none" }}
        >
          LOGIN
        </Button>
        <Typography 
         variant="body2" 
         align="center" 
         sx={{ mt: 2, color: "#333" }} 
          >
         Don’t have an account?{" "}
        <span 
         onClick={() => navigate("/")} 
          style={{ 
            color: "#1976d2", 
            cursor: "pointer", 
            textDecoration: "underline", 
           fontWeight: "bold" 
    }}
  >
    Sign up
  </span>
</Typography>
      </Box>
    </Container>
  );
};

export default Login;