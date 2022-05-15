import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

export type Message = {
  id: number;
  message: string;
};

type ToastProps = {
  message: Message;
};

const Toast: React.FC<ToastProps> = args => {
  const { message } = args;

  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      key={message.id}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
