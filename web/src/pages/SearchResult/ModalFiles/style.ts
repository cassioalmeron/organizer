import { Box } from '@mui/material';
import styled from 'styled-components';

export const Ul = styled.ul`
  list-style-type: none;
  color: black;
`;

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background: #fff;
  border: '2px solid #000';
  box-shadow: 24;
  padding: 5px;
`;

export const ItemBox = styled(Box)`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  gap: 10px;
`;

export const IconBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;
  border-radius: 8px;
  border: 1px none #000;
  padding: 5px;
`;

export const UrlText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: black;
  overflow: hidden;

  a {
    color: black;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
