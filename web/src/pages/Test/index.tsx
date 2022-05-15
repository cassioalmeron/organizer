/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import {
  Alert,
  Box,
  BoxProps,
  Button,
  CssBaseline,
  Divider,
  Snackbar,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from 'formik';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import InputTags from '../../components/InputTags';

interface ContainerProps extends BoxProps {
  open?: boolean;
}

type Tag = {
  id: number;
  description: string;
};

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const validationSchema = Yup.object({
  friends: Yup.array().min(2),
});

const Test: React.FC = () => {
  return (
    <>
      <div>
        <h1>Invite friends</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="friends">
                {({ insert, remove, push }) => (
                  <div>
                    {values.friends.length > 0 &&
                      values.friends.map((friend, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`friends.${index}.name`}>
                              Name
                            </label>
                            <Field
                              name={`friends.${index}.name`}
                              placeholder="Jane Doe"
                              type="text"
                            />
                            <ErrorMessage
                              name={`friends.${index}.name`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`friends.${index}.email`}>
                              Email
                            </label>
                            <Field
                              name={`friends.${index}.email`}
                              placeholder="jane@acme.com"
                              type="email"
                            />
                            <ErrorMessage
                              name={`friends.${index}.name`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => push({ name: '', email: '' })}
                    >
                      Add Friend
                    </button>
                  </div>
                )}
              </FieldArray>
              <button type="submit">Invite</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Test;
