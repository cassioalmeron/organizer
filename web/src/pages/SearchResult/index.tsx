import { Container, Fab, Pagination } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { apiGet } from '../../services/api';

type Row = {
  id: number;
  title: string;
  hashTags: string;
};

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    width: 550,
  },
  {
    field: 'hashTags',
    headerName: 'Hash Tags',
    width: 350,
  },
  {
    field: 'a',
    headerName: '',
    width: 95,
    renderCell: (params: GridRenderCellParams<Date>) => {
      return (
        <Box display="flex" alignItems="center">
          <Fab size="small" color="secondary" aria-label="add">
            <DocumentScannerIcon
              onClick={() => openOriginal(params.row)}
              sx={{ cursor: 'pointer' }}
            />
          </Fab>

          <Fab size="small" color="error" aria-label="add">
            <RemoveIcon />
          </Fab>
        </Box>
      );
    },
  },
];

function openOriginal(row: Row) {
  window.open('https://onedrive.live.com/?id=root&cid=D73A3A038DA9121A');
}

const SearchResult: React.FC = () => {
  const { keyWord } = useParams();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    getData(keyWord, responseData => setRows(responseData));
  }, [keyWord]);

  return (
    <Container sx={{ height: '90%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        hideFooterPagination
        hideFooter
      />

      <Pagination count={10} page={1} />
    </Container>
  );
};

function getData(
  keyWord: string | undefined,
  callback: (responseData: Row[]) => void,
): void {
  const q = keyWord ? String(keyWord) : '';
  apiGet(`Document?keyWord=${q}`, data => {
    callback(data);
  });
}

export default SearchResult;
