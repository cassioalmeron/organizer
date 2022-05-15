import React, { useState, useCallback } from 'react';
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
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [open, setOpen] = useState(false);
  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  const handleLogoff = useCallback(() => {
    signOut();
    navigate('/Login');
  }, [navigate]);

  return (
    <AppBarContainer open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        {/* <IconButton
    edge="start"
    color="inherit"
    aria-label="open drawer"
    onClick={toggleDrawer}
    sx={{
      marginRight: '36px',
      ...(open && { display: 'none' }),
    }}
  >
    <MenuIcon />
  </IconButton> */}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        {/* <IconButton color="inherit">
    <Badge badgeContent={4} color="secondary">
      <NotificationsIcon />
    </Badge>
  </IconButton> */}

        <MenuItem onClick={handleLogoff}>
          <IconButton aria-label="Logoff" color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </MenuItem>
      </Toolbar>
    </AppBarContainer>
  );
};

export default AppBar;
