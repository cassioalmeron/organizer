import { Box, Button, Container, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Yup from 'yup';

import { useNavigate, useParams } from 'react-router-dom';

import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'material-react-toastify';
import InputTags from '../../components/InputTags';
import { apiGet, apiPost, apiPut } from '../../services/api';
import { FileBox } from './styles';

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string(),
  hashTags: Yup.array().of(Yup.string()),
  files: Yup.array().required().min(1),
});

type Document = {
  id?: number;
  title?: string;
  description?: string;
  hashTags: string[];
  files: File[];
};

type File = {
  id: number;
  url: string;
};

const initialValues: Document = {
  title: undefined,
  description: undefined,
  hashTags: [],
  files: [{ id: 1, url: '' }],
};

const Document: React.FC = () => {
  const [document, setDocument] = useState<Document>(initialValues);

  const navigate = useNavigate();
  const { id } = useParams();

  const loadEditData = useCallback((data: Document) => {
    setDocument(data);
  }, []);

  useEffect(() => {
    if (id) {
      apiGet(`Document/${id}`, (data: Document) => {
        loadEditData(data);
      });
    }
  }, [id, loadEditData]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDocument({
        ...document,
        [name]: value,
      });
    },
    [document],
  );

  const successfulAndNavigate = useCallback(() => {
    toast('Document saved successful!');
    navigate('/');
  }, [navigate]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (id) {
        const documentToSave = { ...document };
        delete documentToSave.id;
        apiPut(`/Document/${id}`, documentToSave, successfulAndNavigate);
      } else apiPost('/Document', document, successfulAndNavigate);
    },
    [document, id, successfulAndNavigate],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
          value={document.title}
          onChange={handleInputChange}
          // error={formik.touched.title && Boolean(formik.errors.title)}
          // helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id="description"
          multiline
          rows={4}
          value={document.description}
          onChange={handleInputChange}
          // error={
          //   formik.touched.description && Boolean(formik.errors.description)
          // }
          // helperText={formik.touched.description && formik.errors.description}
        />

        <InputTags
          tags={document.hashTags}
          onTagsChanged={newTags => {
            setDocument({
              ...document,
              hashTags: newTags,
            });
          }}
        />

        <div>
          {document.files.map((file, index) => (
            <FileBox key={file.id}>
              <TextField
                margin="normal"
                id="url"
                label="url"
                name={`files.${index}.url`}
                onChange={e => {
                  const files = [...document.files];
                  files[index].url = e.target.value;
                  setDocument({
                    ...document,
                    files,
                  });
                }}
                fullWidth
                value={file.url}
                // error={
                //   formik.touched.files?[index].url &&
                //   Boolean(formik.errors.files?[index].url)
                // }
                // helperText={
                //   formik.touched.files[index].url &&
                //   formik.errors.files[index].url
                // }
              />
              <Fab
                size="small"
                color="error"
                aria-label="add"
                onClick={() => {
                  const files = [
                    ...document.files.filter((_, i) => i !== index),
                  ];
                  setDocument({
                    ...document,
                    files,
                  });
                }}
                sx={{ marginLeft: '10px' }}
              >
                <RemoveIcon />
              </Fab>
            </FileBox>
          ))}

          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            onClick={() => {
              setDocument({
                ...document,
                files: [...document.files, createFile(document.files)],
              });
            }}
          >
            <AddIcon />
          </Fab>
        </div>

        <br />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Document;

function createFile(files: File[]): File {
  let id = 0;
  if (files.length > 0) id = files[files.length - 1].id + 1;
  const file: File = { id, url: '' };
  return file;
}
