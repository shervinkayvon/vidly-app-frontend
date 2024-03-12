import React, { useState } from 'react';
import { TextField, Button, Switch } from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';

import RequestApis from '../../apis/RequestApis';

function AddEditCustomerForm({ handleClose, row }) {
    const [showStatus, setShowStatus] = useState('');
    const isRowLoaded = _.isObject(row);

    return (
        <Formik
            initialValues={{ 
                name: (isRowLoaded && row.name) ? row.name : '', 
                phone: (isRowLoaded && row.phone) ? row.phone : '',
                isGold: (isRowLoaded && row.isGold) ? row.isGold : false
            }}
            onSubmit={(values, { setSubmitting }) => {
                if (isRowLoaded) {
                    values.id = row.id;
                    RequestApis.editCustomer(values).then((res) => {
                        if (res.data) {
                            handleClose();
                            setSubmitting(false);
                        }
                    }).catch((err) => {
                        setShowStatus(err.response && err.response.data);
                        setSubmitting(false);
                    });
                } else {
                    RequestApis.setCustomer(values).then((res) => {
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
                <TextField 
                    autoComplete='one-time-code'
                    label="*Phone" 
                    variant="outlined"
                    type="phone"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.phone}
                />
                {errors.phone && touched.phone && errors.phone}
                <br/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="isGold">Is Gold</label>
                    <Switch
                        id="isGold"
                        name="isGold"
                        checked={values.isGold}
                        onChange={handleChange}
                        disabled={isSubmitting}/>
                </div>
                <br/>
                <Button 
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
                {showStatus && <p style={{ textAlign: 'center' }}>{showStatus}</p>}
            </form>
        )}
        </Formik>
    );
}

export default AddEditCustomerForm;