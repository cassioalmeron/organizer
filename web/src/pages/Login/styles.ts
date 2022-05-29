import { Box } from '@mui/material';
import styled from 'styled-components';

export const Google = styled.div`
  background-color: #fff;
  color: #000;
  align-items: center;
  display: flex;
  width: 230px;
  height: 45px;
  font-weight: bold;
  justify-content: center;
  border: 0px none;
  border-radius: 2em;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;
  span {
    margin-left: 10px;
  }
`;

export const ExternalLink = styled.a`
  color: black;
`;

export const LogoBox = styled(Box)`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

export const RightBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 40vw;
`;

export const LoginBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40vw;
`;

export const CreditsBox = styled(Box)`
  margin-bottom: 10px;
`;

export const SocialCreditsBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 40vw;
`;
