import React, { useCallback, useState } from 'react';

import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Google } from './styles';
import googleImg from '../../assets/images/google.svg';
import logoImg from '../../assets/images/organizer.png';
import { useAuth } from '../../hooks/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const [isBusy, setIsBusy] = useState(false);

  const handleSignInWithGoogle = useCallback(async () => {
    setIsBusy(true);
    await signInWithGoogle({
      then: () => navigate('/'),
      finally: () => {
        setIsBusy(false);
      },
    });
  }, [navigate, signInWithGoogle]);

  return (
    <Grid container component="main">
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={logoImg} alt="Logotipo" />
      </Box>

      <Box
        component={Paper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40vw',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Google onClick={handleSignInWithGoogle}>
            {isBusy ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <img src={googleImg} alt="Google" />
                <span>Sign in With Google</span>
              </>
            )}
          </Google>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;

// https://mui.com/material-ui/getting-started/templates/sign-in-side/
