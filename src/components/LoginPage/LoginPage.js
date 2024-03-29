import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { TextField, Button, LinearProgress } from '@mui/material';
import jwt from 'jsonwebtoken';

import RequestApis from '../../apis/RequestApis';
import './LoginPage.css';
import logo from '../../assets/vidly-logo.png';


function LoginPage() {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);

    const [loggedIn, setLoggedIn] = useState(decodedToken && decodedToken.iat ? true : false);
    const [showStatus, setShowStatus] = useState('');

    useEffect(() => {
        if (loggedIn) {
            window.location.href = '/';
        }
    }, [loggedIn]);

    return (
        <div>
            {loggedIn ? <LinearProgress/> :
                <div>
                    <img style={{ width: 160, margin: '60px auto 0', display: 'block' }} src={logo} alt="logo"/>
                    <Formik
                        initialValues={{ 
                            email: '', 
                            password: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            RequestApis.authRequest(values).then((res) => {
                                if (res.data) {
                                    localStorage.setItem('token', res.data);
                                    setLoggedIn(true);
                                    setSubmitting(false);
                                }
                            }).catch((err) => {
                                setShowStatus(err.response && err.response.data);
                                setLoggedIn(false);
                                setSubmitting(false);
                            });
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
                        <form className="login-form" onSubmit={handleSubmit}>
                            <TextField 
                                autoComplete='one-time-code'
                                label="*Email" 
                                variant="outlined"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                            <TextField 
                                autoComplete='one-time-code'
                                label="*Password" 
                                variant="outlined"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
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
            }
        </div>
    );
    
}

export default LoginPage;