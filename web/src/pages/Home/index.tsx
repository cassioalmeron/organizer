/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import styled from '@emotion/styled';
import {
  Box,
  BoxProps,
  Button,
  Container,
  Divider,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../hooks/auth';

interface ContainerProps extends BoxProps {
  open?: boolean;
}

const FormBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'open',
})<ContainerProps>(({ theme, open }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  background: 'white',
}));

interface CustomButtonProps extends BoxProps {
  open?: boolean;
}

const CustomButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'open',
})<CustomButtonProps>(() => ({
  fontSize: '32px',
  maxWidth: '20em',
  minWidth: '20em',
}));

export default function Home() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [keyWord, setKeyWord] = useState('');

  const handleSearch = useCallback(() => {
    navigate(`SearchResult?keyWord=${keyWord}`);
  }, [keyWord, navigate]);

  const handleAddNewDocument = useCallback(() => {
    navigate('Document');
  }, [navigate]);

  return (
    <Container>
      <FormBox>
        {/* <Item> */}
        <br />
        <br />
        {/* Welcome {auth.user.name} */}
        <TextField
          margin="normal"
          id="search"
          label="Part of Title or Description to Search"
          name="keyWord"
          autoComplete="search"
          autoFocus
          fullWidth
          onChange={e => setKeyWord(e.target.value)}
          inputProps={{ style: { fontSize: '32px' } }}
          InputLabelProps={{ style: { fontSize: '32px' } }}
        />
        <Divider sx={{ my: 1 }} />
        <CustomButton type="button" onClick={handleSearch} variant="contained">
          <SearchIcon
            style={{
              fontSize: '32px',
            }}
          />
          Search
        </CustomButton>
        <Divider sx={{ my: 1 }} />
        <CustomButton
          type="button"
          onClick={handleAddNewDocument}
          variant="contained"
          color="secondary"
        >
          Add New Document
        </CustomButton>
      </FormBox>
    </Container>
  );
}
