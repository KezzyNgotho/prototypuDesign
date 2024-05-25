import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const SpinLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress
        style={{ marginBottom: 2 }}
        color="primary"
        size={60}
      />
      <Typography variant="h6" color="primary">
        Loading...
      </Typography>
    </div>
  );
};

export default SpinLoading;
