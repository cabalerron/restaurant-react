import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import MenuForm from './MenuForm';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ref, onValue, remove } from 'firebase/database';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const menuRef = ref(database, 'menu');
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const menuData = snapshot.val();
      const menuList = [];
      for (let id in menuData) {
        menuList.push({ id, ...menuData[id] });
      }
      setMenuItems(menuList);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = (id) => {
    remove(ref(database, `menu/${id}`));
  };

  const handleClose = () => {
    setEditingItem(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Menu
      </Typography>
      <Button variant="contained" onClick={() => setEditingItem({})}>
        Add New Item
      </Button>
      {editingItem && <MenuForm menuItem={editingItem} onClose={handleClose} />}
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <Paper key={item.id} sx={{ mb: 2, p: 2 }}>
            <ListItem>
              <ListItemText
                primary={`${item.name} - ₱${item.price}`}
                secondary={`Category: ${item.category}, Cost: ₱${item.cost}, Stock: ${item.stock}`}
              />
              <IconButton onClick={() => handleEdit(item)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default MenuList;
