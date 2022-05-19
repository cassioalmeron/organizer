import React, { useCallback } from 'react';
import {
  IconButton,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Name } from './styles';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarContainer = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  // zIndex: 1000,
  transition: 'width 0.2s 0s ease',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const AppBar: React.FC = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogoff = useCallback(() => {
    signOut();
    navigate('/Login');
  }, [navigate]);

  return (
    <AppBarContainer>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Organizer
        </Typography>

        <MenuItem onClick={handleLogoff}>
          {auth && (
            <>
              <span>Welcome</span>
              <Name>{auth?.user.name}</Name>
            </>
          )}
          <IconButton aria-label="Logoff" color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </MenuItem>
      </Toolbar>
    </AppBarContainer>
  );
};

export default AppBar;
