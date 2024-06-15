import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" color="inherit" align="center" sx={{ width: '100%' }}>
          © {new Date().getFullYear()} Erron's Restaurant Menu App. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
