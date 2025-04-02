import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        borderRadius: '8px',
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
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleRegister} 
          sx={{ mb: 2, mt: 2 }}
        >
          Register
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Register;