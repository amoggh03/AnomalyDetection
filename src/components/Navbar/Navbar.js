import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Anomaly Detection
        </Typography>
        <Button href="#anomaly-detection" color="inherit">Anomaly Detection</Button>
        <Button href="https://www.canva.com" target="_blank" rel="noopener noreferrer" color="inherit">Tech Stack</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;