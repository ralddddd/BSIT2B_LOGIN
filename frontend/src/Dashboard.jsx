import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [newItem, setNewItem] = useState(""); 
  const [items, setItems] = useState([]); 

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
      
      // Load items for the logged-in user from localStorage
      const storedItems = localStorage.getItem(`items_${storedUser}`);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } else {
      navigate("/login");
    } 
  }, [navigate]);

  const addItem = () => {
    if (newItem.trim() === "") return;

    const newItemObj = { id: Date.now(), name: newItem };
    const updatedItems = [...items, newItemObj];
    setItems(updatedItems);
    setNewItem("");

    // Save updated items to localStorage for the specific user
    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));
  };

  const updateItem = (id, newName) => {
    const updatedItems = items.map(item => (item.id === id ? { ...item, name: newName } : item));
    setItems(updatedItems);

    // Save updated items to localStorage
    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    // Save updated items to localStorage
    localStorage.setItem(`items_${user}`, JSON.stringify(updatedItems));
  };

  return (
    <Container sx={{ backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
        Welcome, {user}!
      </Typography>
      <Typography variant="h5" align="center" sx={{ color: '#333', marginBottom: '20px' , fontWeight: 'bold' }}>
        ADD OR DELETE
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Add Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        sx={{ marginBottom: '20px', borderRadius: '4px' }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={addItem} sx={{ backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#008000' } }}>
        Add Item
      </Button>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {items.map(item => (
          <li key={item.id} style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <TextField
              fullWidth
              value={item.name}
              onChange={(e) => updateItem(item.id, e.target.value)}
              sx={{ marginRight: '10px', borderRadius: '4px' }}
            />
            <Button variant="contained" color="secondary" onClick={() => deleteItem(item.id)} style={{ marginLeft: "10px", backgroundColor: '#f50057', '&:hover': { backgroundColor: '#c51162' } }}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#f50057' } }} onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
