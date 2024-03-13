import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel} from '@mui/material';
import { Formik } from 'formik';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';

import RequestApis from '../../../apis/RequestApis';
import './AddEditMovieForm.css';

function AddEditMovieForm({ handleClose, row }) {
    const [showStatus, setShowStatus] = useState('');
    const [genres, setGenres] = useState([]);

    const isRowLoaded = _.isObject(row);

    useEffect(() => {
        RequestApis.getGenres().then((res) => {
            if (res.data) {
                setGenres(res.data);
            }
        })
    }, []);

    return (
        <Formik
            initialValues={{ 
                title: (isRowLoaded && row.title) ? row.title : '', 
                genre: (isRowLoaded && row.genre && row.genre._id) ? row.genre._id : '',
                numberInStock: (isRowLoaded && row.numberInStock) ? row.numberInStock : '',
                dailyRentalRate: (isRowLoaded && row.dailyRentalRate) ? row.dailyRentalRate : ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                if (isRowLoaded) {
                    values.id = row.id;
                    RequestApis.editMovie(values).then((res) => {
                        if (res.data) {
                            handleClose();
                            setSubmitting(false);
                        }
                    }).catch((err) => {
                        setShowStatus(err.response && err.response.data);
                        setSubmitting(false);
                    });
                } else {
                    RequestApis.addMovie(values).then((res) => {
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
                    label="*Title" 
                    variant="outlined"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.title}
                />
                {errors.title && touched.title && errors.title}
                <br/>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                    labelId="genre-label"
                    id="genre"
                    value={values.genre}
                    name="genre" 
                    onChange={handleChange}
                    >
                    {genres.map((genre, index) => (
                        <MenuItem key={index} value={genre._id}>{genre.name}</MenuItem>
                    ))}
                </Select>
                <br/>
                <NumericFormat 
                    autoComplete='one-time-code'
                    label="*Number In Stock" 
                    variant="outlined"
                    type="text"
                    name="numberInStock"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.numberInStock}
                    customInput={TextField}
                    decimalScale={2}
                />
                {errors.numberInStock && touched.numberInStock && errors.numberInStock}
                <br/>
                <NumericFormat 
                    autoComplete='one-time-code'
                    label="*Daily Rental Rate" 
                    variant="outlined"
                    type="text"
                    name="dailyRentalRate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    value={values.dailyRentalRate}
                    customInput={TextField}
                    decimalScale={2}
                />
                {errors.dailyRentalRate && touched.dailyRentalRate && errors.dailyRentalRate}
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

export default AddEditMovieForm;