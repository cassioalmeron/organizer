/* eslint-disable react/no-array-index-key */
import { Box, Modal } from '@mui/material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import React from 'react';
import { IconBox, ItemBox, ModalBox, Ul, UrlText } from './style';

type ModalFilesProps = {
  open: boolean;
  files: string[];
  onClose: () => void;
};

const ModalFiles: React.FC<ModalFilesProps> = args => {
  const { open, onClose, files } = args;

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Ul>
          {files.map((url, index) => (
            <li key={index}>
              <ItemBox>
                <a href={url} target="_blank" rel="noreferrer">
                  <IconBox bgcolor="secondary.main">
                    <DocumentScannerIcon
                      sx={{ cursor: 'pointer' }}
                      fontSize="large"
                    />
                  </IconBox>
                </a>

                <UrlText>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </UrlText>
              </ItemBox>
            </li>
          ))}
        </Ul>
      </ModalBox>
    </Modal>
  );
};

export default ModalFiles;
