import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { database } from './firebase';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { ref, push, set, update } from 'firebase/database';

const MenuForm = ({ menuItem, onClose }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: menuItem || {
      category: '',
      name: '',
      price: '',
      cost: '',
      stock: '',
      options: [{ name: '', price: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit = (data) => {
    if (menuItem?.id) {
      // Update existing item
      update(ref(database, `menu/${menuItem.id}`), data);
    } else {
      // Create a new item
      const newMenuItemRef = push(ref(database, 'menu'));
      set(newMenuItemRef, data);
    }
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category"
            {...register('category', { required: 'Category is required' })}
            error={!!errors.category}
            helperText={errors.category && errors.category.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Price (PHP)"
            type="number"
            {...register('price', { required: 'Price is required' })}
            error={!!errors.price}
            helperText={errors.price && errors.price.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cost (PHP)"
            type="number"
            {...register('cost', { required: 'Cost is required' })}
            error={!!errors.cost}
            helperText={errors.cost && errors.cost.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount in Stock"
            type="number"
            {...register('stock', { required: 'Stock is required' })}
            error={!!errors.stock}
            helperText={errors.stock && errors.stock.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Options</Typography>
          {fields.map((option, index) => (
            <Grid container spacing={2} key={option.id} alignItems="center">
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option Name"
                  {...register(`options.${index}.name`, { required: 'Option Name is required' })}
                  error={!!errors.options?.[index]?.name}
                  helperText={errors.options?.[index]?.name && errors.options?.[index]?.name.message}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option Price (PHP)"
                  type="number"
                  {...register(`options.${index}.price`, { required: 'Option Price is required' })}
                  error={!!errors.options?.[index]?.price}
                  helperText={errors.options?.[index]?.price && errors.options?.[index]?.price.message}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => remove(index)}>
                  <Remove />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() => append({ name: '', price: '' })}
          >
            Add Option
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuForm;
