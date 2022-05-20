import Modal from 'react-modal';
import { useState } from 'react';
import { Field, ErrorMessage, Form, Formik } from 'formik';

export default () => {
    const [modalIsOpen, setModal] = useState(false);

    const customStyles = {
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
    };

    function show() {
        setModal(true);
    }

    function hide() {
        setModal(false);
    }

    return (
        <>
            <button onClick={show}>show</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={hide}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel="Login Modal"
            >
                <h1 className="text-2xl font-semibold">Access limited! Please login first!</h1>

                <Formik
                    initialValues={{ password: '', username: '', login: '' }}
                    onSubmit={(values, { setErrors }) => {
                        setErrors({
                            login: 'Username or password is incorrect',
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
                                <Field name="username" placeholder="Username" className="border border-gray-200 p-2 rounded-md" />
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
                                className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150"
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
