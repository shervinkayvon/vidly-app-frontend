import React, { useState } from 'react';
import { TextField, Button, Switch } from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';

import RequestApis from '../../../apis/RequestApis';

function DeleteMovieForm({ handleClose, row }) {
    const [showStatus, setShowStatus] = useState('');
    const isRowLoaded = _.isObject(row);

    return (
        <div>
            <Formik
                initialValues={{}}
                onSubmit={(values, { setSubmitting }) => {
                    values.id = row.id;
                    
                    RequestApis.deleteMovie(values).then((res) => {
                        if (res.data) {
                            handleClose();
                            setSubmitting(false);
                        }
                    }).catch((err) => {
                        setShowStatus(err.response && err.response.data);
                        setSubmitting(false);
                    });
                }}
                >
                {({
                    handleSubmit,
                    isSubmitting
                }) => (
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete this movie?</p>
                    <p>Title: <strong>{isRowLoaded ? row.title : ''}</strong></p>
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
    
        </div>
    );
}

export default DeleteMovieForm;