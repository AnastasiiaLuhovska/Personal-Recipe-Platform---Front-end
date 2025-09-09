import React from 'react';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import styles from './LoginPage.module.css';
import type {LoginFormValues} from "../../types/types.ts";
import {loginThunk} from "../../redux/auth/operations.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../../redux/store.ts";


const emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const validationSchema = Yup.object({
    email: Yup.string()
        .matches(emailRegexp, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

const LoginPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const isLoading = useSelector((state: any) => state.auth.isLoading);

    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

    const handleSubmit = (values: LoginFormValues,  actions:FormikHelpers<LoginFormValues>) => {
        dispatch(loginThunk(values))
        actions.resetForm()
    };

    return (
        <div className={styles.loginWrapper}>
            <div className='container'>
                <div className={styles.loginContainer}>
                    <div className={styles.loginCard}>
                        <div className={styles.loginHeader}>
                            <h1 className={styles.loginTitle}>Welcome Back</h1>
                            <p className={styles.loginSubtitle}>
                                Sign in to your account
                            </p>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ dirty, isValid }) => (
                                <Form className={styles.loginForm}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="email" className={styles.label}>
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={styles.input}
                                            placeholder="Enter your email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

                                    <div className={styles.inputGroup}>
                                        <label htmlFor="password" className={styles.label}>
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className={styles.input}
                                            placeholder="Enter your password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!dirty || !isValid || isLoading}
                                        className={`${styles.submitButton} ${
                                            (!dirty || !isValid || isLoading) ? styles.submitButtonDisabled : ''
                                        }`}
                                    >
                                        {isLoading ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className={styles.loginFooter}>
                            <p className={styles.registerText}>
                                Don't have an account?{' '}
                                <Link to="/register" className={styles.registerLink}>
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;