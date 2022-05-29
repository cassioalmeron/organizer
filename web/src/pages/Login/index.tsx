import React, { useCallback, useState } from 'react';

import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useNavigate } from 'react-router-dom';

import {
  Google,
  ExternalLink,
  LoginBox,
  LogoBox,
  RightBox,
  SocialCreditsBox,
  CreditsBox,
} from './styles';
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
      <LogoBox>
        <img src={logoImg} alt="Logotipo" />
      </LogoBox>

      <RightBox component={Paper}>
        <div />

        <LoginBox>
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
        </LoginBox>
        <CreditsBox>
          <SocialCreditsBox>
            <span>Cassio Almeron - 2022</span>
            <span>
              <ExternalLink
                href="https://www.linkedin.com/in/cassio-almeron-490a94198/"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon fontSize="large" />
              </ExternalLink>
            </span>
            <span>
              <ExternalLink
                href="https://github.com/cassioalmeron"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon fontSize="large" />
              </ExternalLink>
            </span>
          </SocialCreditsBox>
          <div>
            <ExternalLink
              href="https://github.com/cassioalmeron/organizer"
              target="_blank"
              rel="noreferrer"
            >
              The sources code of this project is shared in GitHub
            </ExternalLink>
          </div>
        </CreditsBox>
      </RightBox>
    </Grid>
  );
};

export default Login;

// https://mui.com/material-ui/getting-started/templates/sign-in-side/
