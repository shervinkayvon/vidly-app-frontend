import React, { useState } from 'react';
import { TextField, Button, Switch } from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import { PatternFormat } from 'react-number-format';

import RequestApis from '../../../apis/RequestApis';

function AddEditGenreForm({ handleClose, row }) {
    const [showStatus, setShowStatus] = useState('');
    const isRowLoaded = _.isObject(row);

    return (
        <Formik
            initialValues={{ 
                name: (isRowLoaded && row.name) ? row.name : ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                if (isRowLoaded) {
                    values.id = row.id;
                    RequestApis.editGenre(values).then((res) => {
                        if (res.data) {
                            handleClose();
                            setSubmitting(false);
                        }
                    }).catch((err) => {
                        setShowStatus(err.response && err.response.data);
                        setSubmitting(false);
                    });
                } else {
                    RequestApis.addGenre(values).then((res) => {
                        if (res.data) {
                            handleClose();
                            setSubmitting(false);
                        }
                    }).catch((err) => {
                        setShowStatus(err.response && err.response.data);
                        setSubmitting(false);
                    });
                }
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit}>
                <TextField 
                    autoComplete='one-time-code'
                    label="*Name" 
                    variant="outlined"
                    type="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.name}
                />
                {errors.name && touched.name && errors.name}
                <br/>
                <Button 
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
                {showStatus && <p style={{ textAlign: 'center', color: 'red' }}>{showStatus}</p>}
            </form>
        )}
        </Formik>
    );
}

export default AddEditGenreForm;