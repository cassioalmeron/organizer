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
  onConfirm: (userResponse: boolean) => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
}) => {
  // const [open, setOpen] = React.useState(true);

  const handleClose = (value: boolean) => {
    // setOpen(false);
    onConfirm(value);
  };

  return (
    <Dialog
      open
      // TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Seu Emprego Já</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)} color="primary">
          Sim
        </Button>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
