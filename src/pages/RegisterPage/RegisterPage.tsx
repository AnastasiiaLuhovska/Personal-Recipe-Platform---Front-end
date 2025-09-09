import React from 'react';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import styles from './RegisterPage.module.css';
import type {RegisterFormValues} from "../../types/types.ts";
import {signUpThunk} from "../../redux/auth/operations.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../../redux/store.ts";
import {selectIsLoading} from "../../redux/auth/selectors.ts";



const emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name should be at least 3 characters long').max(30, 'Name shouldnt be longer that 30 characters').required('Name is required'),
    email: Yup.string()
        .matches(emailRegexp, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

const RegisterPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const isLoading = useSelector(selectIsLoading);

    const initialValues: RegisterFormValues = {
        name: '',
        email: '',
        password: ''
    };

    const handleSubmit = (values: RegisterFormValues, actions:FormikHelpers<RegisterFormValues>) => {
        dispatch(signUpThunk(values))
        actions.resetForm()
    };

    return (
        <div className={styles.registerWrapper}>
            <div className='container'>
                <div className={styles.registerContainer}>
                    <div className={styles.registerCard}>
                        <div className={styles.registerHeader}>
                            <h1 className={styles.registerTitle}>Create Account</h1>
                            <p className={styles.registerSubtitle}>
                                Join us and discover amazing recipes
                            </p>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ dirty, isValid }) => (
                                <Form className={styles.registerForm}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="name" className={styles.label}>
                                            Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={styles.input}
                                            placeholder="Enter your name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className={styles.errorMessage}
                                        />
                                    </div>

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
                                            placeholder="Create a password"
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
                                        {isLoading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className={styles.registerFooter}>
                            <p className={styles.loginText}>
                                Already have an account?{' '}
                                <Link to="/login" className={styles.loginLink}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;