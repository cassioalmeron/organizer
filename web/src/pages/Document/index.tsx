import { Box, Button, Container, Fab, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as Yup from 'yup';
import { FieldArray, FormikProvider, useFormik } from 'formik';

import { useNavigate, useParams } from 'react-router-dom';

import React, { useCallback, useEffect, useState } from 'react';
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
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const submit = useCallback(
    (values: any): void => {
      if (id) {
        apiPut(`/Document/${id}`, values, () => {
          toast('Document saved successful!');
          navigate('/');
        });
      } else {
        apiPost('/Document', values, () => {
          toast('Document saved successful!');
          navigate('/');
        });
      }
    },
    [id, navigate],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  const loadEditData = useCallback(
    (data: Document) => {
      const loadedData = { ...data };
      delete loadedData.id;

      Object.assign(initialValues, loadedData);
      setTags(data.hashTags);
    },
    [formik.values],
  );

  useEffect(() => {
    if (id) {
      apiGet(`Document/${id}`, (data: Document) => {
        loadEditData(data);
      });
    }
    // else {
    //   loadEditData(initialValues);
    // }
  }, [id, loadEditData]);

  // useEffect(() => {
  //   return () => {
  //     // loadEditData({
  //     //   title: undefined,
  //     //   description: undefined,
  //     //   hashTags: [],
  //     //   files: [{ id: 1, url: '' }],
  //     // });
  //     console.log({
  //       title: undefined,
  //       description: undefined,
  //       hashTags: [],
  //       files: [{ id: 1, url: '' }],
  //     });
  //   };
  // });

  // function loadEditData(data: Document) {

  return (
    <Container>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
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
            label="Description"
            id="description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <InputTags
            tags={tags}
            onTagsChanged={newTags => {
              formik.setFieldValue('hashTags', newTags);
              setTags(newTags);
            }}
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
        </form>
      </FormikProvider>
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
