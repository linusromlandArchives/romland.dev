//External dependencies import
import Modal from 'react-modal';
import Select from 'react-select';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { useState, useEffect } from 'react';

//Local dependencies import
import axios from '../axios';
import { successNotify, errorNotify } from './Toast';

export default () => {
    const [modalIsOpen, setModal] = useState(false);

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        (async () => {
            const request = await axios.get('/api/programmingLanguage/');
            const response = await request.data;
            if (response.success) {
                const formattedLanguages = response.data.map((language) => ({
                    value: language.programmingLanguageID,
                    label: language.programmingLanguageName,
                }));

                setLanguages(formattedLanguages);
            } else {
                errorNotify(response.error);
                setModal(false);
            }
        })();
    }, []);

    return (
        <>
            <button onClick={() => setModal(true)}>Create project</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModal(false)}
                shouldCloseOnOverlayClick={true}
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
                <h1 className="mb-2 text-xl font-semibold">Create project</h1>

                <Formik
                    initialValues={{
                        projectName: '',
                        projectDescription: '',
                        projectSourceCodeURL: '',
                        projectURL: '',
                        languageIDs: [],
                        created: '',
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const request = await axios.post('/api/project/', values);
                        const response = await request.data;
                        if (response.success) {
                            setModal(false);
                            successNotify('Project created', {
                                theme: 'colored',
                                position: 'top-right',
                            });
                        } else {
                            setErrors(response.errors);
                            errorNotify('Error when creating project', {
                                theme: 'colored',
                                position: 'top-right',
                            });
                        }
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (values.projectName.trim() === '') {
                            errors.projectName = 'Project name cannot be empty';
                        }

                        if (values.projectDescription.trim() === '') {
                            errors.projectDescription = 'Project description cannot be empty';
                        }

                        if (values.projectSourceCodeURL.trim() === '') {
                            errors.projectSourceCodeURL = 'Project Source Code URL cannot be empty';
                        }

                        if (values.projectURL.trim() === '') {
                            errors.projectURL = 'Project URL cannot be empty';
                        }

                        const urlRegex = /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\\&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/gi;

                        if (values.projectSourceCodeURL.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.projectSourceCodeURL)) {
                                errors.projectSourceCodeURL = 'Project Source Code URL is not a valid URL';
                            }
                        }

                        if (values.projectURL.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.projectURL)) {
                                errors.projectURL = 'Project URL is not a valid URL';
                            }
                        }

                        if (values.languageIDs.length === 0) {
                            errors.languageIDs = 'Please select at least one programming language';
                        }

                        return errors;
                    }}
                >
                    {({ setFieldValue, dirty, isValid }) => (
                        <Form className="flex flex-col">
                            <label className="flex flex-col">
                                Project name
                                <Field name="projectName" placeholder="Project name" className="border border-gray-200 p-2 rounded-md" />
                            </label>
                            <ErrorMessage component="span" name="projectName" className="text-red-500 text-md mb-4 italic" />
                            <label className="flex flex-col">
                                Project description
                                <Field
                                    name="projectDescription"
                                    placeholder="Project description"
                                    className="border border-gray-200 p-2 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="projectDescription" className="text-red-500 text-md mb-4 italic" />
                            <label className="flex flex-col">
                                Project Source Code URL (ex. to github or gitlab)
                                <Field
                                    name="projectSourceCodeURL"
                                    placeholder="Project Source Code URL"
                                    className="border border-gray-200 p-2 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="projectSourceCodeURL" className="text-red-500 text-md mb-4 italic" />
                            <label className="flex flex-col">
                                Project URL (ex. to demo)
                                <Field name="projectURL" placeholder="Project URL" className="border border-gray-200 p-2 rounded-md" />
                            </label>
                            <ErrorMessage component="span" name="projectURL" className="text-red-500 text-md mb-4 italic" />

                            <label className="flex flex-col">
                                Programming Languages (select at least one)
                                <Field
                                    component={Select}
                                    isMulti={true}
                                    options={languages}
                                    onChange={(value) =>
                                        setFieldValue(
                                            'languageIDs',
                                            value.map((language) => language.value),
                                        )
                                    }
                                    name="languageIDs"
                                    className="border border-gray-200 p-2 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="languageIDs" className="text-red-500 text-md mb-4 italic" />

                            <ErrorMessage component="span" name="created" className="text-red-500 text-md mt-4 italic" />
                            <input
                                disabled={!dirty || !isValid}
                                className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed"
                                type="submit"
                                value="Create"
                            />
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};
