//External dependencies import
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

//Local dependencies import
import axios from '../axios';
import { successNotify } from './Toast';

export default () => {
    const [modalIsOpen, setModal] = useState(true);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const request = await axios.get('/api/auth');
            const data = await request.data;
            if (data.success) {
                setModal(false);
            }
        }
        fetchData();
    }, [modalIsOpen]);

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModal(false)}
                shouldCloseOnOverlayClick={false}
                contentLabel="Login Modal"
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        border: 'none',
                        background: '#fff',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                    },
                }}
            >
                <div className="mb-4">
                    <Link to="/" className="hover:underline mb-4 ">
                        Go back
                    </Link>
                    <h1 className="text-3xl font-semibold">Access limited</h1>
                    <p className="text-xl"> Please login to access this page</p>
                </div>

                <Formik
                    initialValues={{ password: '', username: '', login: '' }}
                    onSubmit={(values, { setErrors }) => {
                        axios.post('/api/auth/login', values).then(({ data }) => {
                            if (data.success) {
                                setModal(false);
                                successNotify('Login successful', {
                                    theme: 'colored',
                                    position: 'top-right',
                                    autoClose: 2500,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                });
                            } else {
                                setErrors({ login: data.error });
                            }
                        });
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (values.username.trim() === '') {
                            errors.username = 'Username cannot be empty';
                        }

                        if (values.password.trim() === '') {
                            errors.password = 'Password cannot be empty';
                        }

                        return errors;
                    }}
                >
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col">
                            <label className="flex flex-col">
                                Username
                                <Field name="username" placeholder="Username" className="border border-gray-200 p-2 rounded-md" autoFocus />
                            </label>
                            <ErrorMessage component="span" name="username" className="text-red-500 text-md mb-4 italic" />
                            <label className="flex flex-col">
                                Password
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="border border-gray-200 p-2 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="password" className="text-red-500 text-md mb-4 italic" />
                            <ErrorMessage component="span" name="login" className="text-red-500 text-md mt-4 italic" />
                            <input
                                disabled={!dirty || !isValid}
                                className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed"
                                type="submit"
                                value="Login"
                            />
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};
