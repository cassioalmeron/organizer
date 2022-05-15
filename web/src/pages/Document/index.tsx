import {
  Box,
  BoxProps,
  Button,
  Container,
  Fab,
  styled,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Yup from 'yup';
import { FieldArray, Form, Formik } from 'formik';

import { useNavigate } from 'react-router-dom';

import React from 'react';
import { toast } from 'material-react-toastify';
import InputTags from '../../components/InputTags';
import { apiPost } from '../../services/api';

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string(),
  hashTags: Yup.array().of(Yup.string()),
  files: Yup.array().required().min(1),
});

const initialValues = {
  title: undefined,
  description: undefined,
  hashTags: [],
  files: [{ id: 1, url: '' }],
};

type File = {
  id: number;
  url: string;
};

const FileBox = styled(Box, {
  shouldForwardProp: prop => prop !== 'background',
})<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const Document: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async values => {
          apiPost('/Document', values, () => {
            toast('Document saved successful!');
            navigate('/');
          });
        }}
      >
        {formik => (
          <Form>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Dscription"
              id="description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <InputTags
              onTagsChanged={tags => formik.setFieldValue('hashTags', tags)}
            />

            <FieldArray name="files">
              {({ insert, remove, push }) => (
                <div>
                  {formik.values.files.map((file, index) => (
                    <FileBox key={file.id}>
                      <TextField
                        margin="normal"
                        id="url"
                        label="url"
                        name={`files.${index}.url`}
                        onChange={formik.handleChange}
                        fullWidth
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
                        onClick={() => remove(index)}
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
                    onClick={() => handleAddFile(formik.values.files, push)}
                  >
                    <AddIcon />
                  </Fab>
                </div>
              )}
            </FieldArray>

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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Document;

function handleAddFile(files: File[], push: (obj: any) => void) {
  let id = 0;
  if (files.length > 0) id = files[files.length - 1].id + 1;
  const file: File = { id, url: '' };
  push(file);
}
