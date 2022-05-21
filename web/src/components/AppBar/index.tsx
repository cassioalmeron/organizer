import React, { useCallback } from 'react';
import { IconButton, Toolbar } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Name } from './styles';

const AppBar: React.FC = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogoff = useCallback(() => {
    signOut();
    navigate('/Login');
  }, [navigate, signOut]);

  return (
    <MuiAppBar>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {auth && (
          <>
            <span>Welcome</span>
            <Name>{auth?.user.name}</Name>
            <IconButton
              aria-label="Logoff"
              color="inherit"
              onClick={handleLogoff}
            >
              <ExitToAppIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
