/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & { children?: React.ReactElement<any, any> },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

interface ConfirmDialogProps {
  message: string;
  open: boolean;
  onConfirm: (userResponse: boolean) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  open,
  onConfirm,
}) => {
  const handleClose = (value: boolean) => {
    onConfirm(value);
  };

  return (
    <Dialog
      open={open}
      // TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Organizer</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose(true)}
          color="primary"
          variant="contained"
        >
          Yes
        </Button>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
