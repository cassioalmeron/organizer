/* eslint-disable react/no-array-index-key */
import { Container, Fab } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiDelete, apiGet } from '../../services/api';
import ConfirmDialog from '../../components/ConfirmDialog';
import ModalFiles from './ModalFiles';

type Row = {
  id: number;
  title: string;
  hashTags: string;

  files: string[];
};

const SearchResult: React.FC = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const [rows, setRows] = useState<Row[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showFilesModal, setShowFilesModal] = useState(false);
  const [currentRow, setCurrentRow] = useState<Row | undefined>();

  useEffect(() => {
    getData(queryParams.get('keyWord') ?? undefined, responseData =>
      setRows(responseData),
    );
  }, [queryParams]);

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
      width: 155,
      renderCell: (params: GridRenderCellParams<Date>) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Fab size="small" color="primary" aria-label="add">
              <EditIcon
                onClick={() => handleEdit(params.row)}
                sx={{ cursor: 'pointer' }}
              />
            </Fab>

            <Fab size="small" color="secondary" aria-label="add">
              <DocumentScannerIcon
                onClick={() => {
                  setCurrentRow(params.row);
                  setShowFilesModal(true);
                }}
                sx={{ cursor: 'pointer' }}
              />
            </Fab>

            <Fab
              size="small"
              color="error"
              aria-label="add"
              onClick={() => {
                setCurrentRow(params.row);
                setDeleteDialogOpen(true);
              }}
            >
              <RemoveIcon />
            </Fab>
          </Box>
        );
      },
    },
  ];

  const handleEdit = useCallback(
    (row: Row) => {
      navigate(`/Document/${row.id}`);
    },
    [navigate],
  );

  const handleCloseFilesModal = useCallback(() => {
    setShowFilesModal(false);
  }, []);

  const confirmDelete = useCallback(
    (value: boolean) => {
      setDeleteDialogOpen(false);
      if (value) {
        apiDelete(`Document/${currentRow?.id}`, () => {
          const newRows = rows.filter(row => row.id !== currentRow?.id);
          setRows(newRows);
        });
      }
    },
    [currentRow, rows],
  );

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

      {/* <Pagination count={10} page={1} /> */}

      <ConfirmDialog
        message={`Would you like to delete '${currentRow?.title}'?`}
        open={deleteDialogOpen}
        onConfirm={confirmDelete}
      />

      {currentRow && (
        <ModalFiles
          open={showFilesModal}
          onClose={handleCloseFilesModal}
          files={currentRow.files}
        />
      )}
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
