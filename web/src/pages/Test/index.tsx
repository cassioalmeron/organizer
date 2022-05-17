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
  FormikProvider,
  useFormik,
} from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { apiGet } from '../../services/api';

type Doc = {
  hashTags: [];
};

const initialValues: Doc = {
  hashTags: [],
};

const validationSchema = Yup.object({
  hashTags: Yup.array(),
});

function submit(values: any): void {
  alert(JSON.stringify(values, null, 2));
}

const Test: React.FC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    apiGet('/Document/6', (data: any) => {
      initialValues.hashTags = data.hashTags;
      alert(data.hashTags);
      setTags(data.hashTags);
    });
  }, []);

  return (
    <>
      <div>
        <h1>Invite friends</h1>
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async values => {
            await new Promise(r => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }) => (
             <Form> */}
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <FieldArray name="hashTags">
              {({ insert, remove, push }) => (
                <div>
                  {formik.values.hashTags.length > 0 &&
                    formik.values.hashTags.map((tag, index) => (
                      <div key={tag}>{tag}</div>
                    ))}
                </div>
              )}
            </FieldArray>
            {/* formik.values.paymentMethods.map((method, index) => (
  <div key={index}>
    <input
      name={`paymentMethods.${index}.name`}
      value={method.name}
      onChange={formikProps.handleChange}
    />
  </div> */}
            <button type="submit">Invite</button>
          </form>
        </FormikProvider>
        {/* </Form> */}
        {/* )} */}
        {/* </Formik> */}
      </div>
    </>
  );

  // return <InputTags tags={tags} onTagsChanged={t => setTags(t)} />;

  // return (
  //   <>
  //     <div>
  //       <h1>Invite friends</h1>
  //       {/* <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={async values => {
  //           await new Promise(r => setTimeout(r, 500));
  //           alert(JSON.stringify(values, null, 2));
  //         }}
  //       >
  //         {({ values }) => (
  //            <Form> */}
  //       <FormikProvider value={formik}>
  //         <form onSubmit={formik.handleSubmit}>
  //           <FieldArray name="friends">
  //             {({ insert, remove, push }) => (
  //               <div>
  //                 {formik.values.friends.length > 0 &&
  //                   formik.values.friends.map((friend, index) => (
  //                     <div className="row" key={index}>
  //                       <div className="col">
  //                         <label htmlFor={`friends.${index}.name`}>Name</label>
  //                         <Field
  //                           name={`friends.${index}.name`}
  //                           placeholder="Jane Doe"
  //                           type="text"
  //                         />
  //                         <ErrorMessage
  //                           name={`friends.${index}.name`}
  //                           component="div"
  //                           className="field-error"
  //                         />
  //                       </div>
  //                       <div className="col">
  //                         <label htmlFor={`friends.${index}.email`}>
  //                           Email
  //                         </label>
  //                         <Field
  //                           name={`friends.${index}.email`}
  //                           placeholder="jane@acme.com"
  //                           type="email"
  //                         />
  //                         <ErrorMessage
  //                           name={`friends.${index}.name`}
  //                           component="div"
  //                           className="field-error"
  //                         />
  //                       </div>
  //                       <div className="col">
  //                         <button
  //                           type="button"
  //                           className="secondary"
  //                           onClick={() => remove(index)}
  //                         >
  //                           X
  //                         </button>
  //                       </div>
  //                     </div>
  //                   ))}
  //                 <button
  //                   type="button"
  //                   className="secondary"
  //                   onClick={() => push({ name: '', email: '' })}
  //                 >
  //                   Add Friend
  //                 </button>
  //               </div>
  //             )}
  //           </FieldArray>
  //           <button type="submit">Invite</button>
  //         </form>
  //       </FormikProvider>
  //       {/* </Form> */}
  //       {/* )} */}
  //       {/* </Formik> */}
  //     </div>
  //   </>
  // );
};

export default Test;
