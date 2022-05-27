//External dependencies import
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//Local dependencies import
import axios from '../axios';
import { successNotify, errorNotify } from '../components/';

export default () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center w-full">
            <div className="w-full p-8 mt-6 rounded-md md:w-1/2 bg-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-semibold">Create programming language</h1>
                    <Link
                        to="/admin/language"
                        className="p-2 text-black transition duration-150 border rounded-md bg-slate-300 hover:bg-slate-200 border-slate-500 ease"
                    >
                        Back to admin
                    </Link>
                </div>
                <Formik
                    initialValues={{
                        programmingLanguageName: '',
                        programmingLanguageDescription: '',
                        programmingLanguageIcon: '',
                        programmingLanguageURL: '',
                        created: '',
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const request = await axios.post('/api/programmingLanguage/', values);
                        const response = await request.data;
                        if (response.success) {
                            successNotify('Language created');
                            navigate('/admin/language');
                        } else {
                            setErrors({
                                created: response.error,
                            });
                            errorNotify('Error when creating language');
                        }
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (values.programmingLanguageName.trim() === '') {
                            errors.programmingLanguageName = 'Language name cannot be empty';
                        }

                        if (values.programmingLanguageDescription.trim() === '') {
                            errors.programmingLanguageDescription = 'Language description cannot be empty';
                        }

                        if (values.programmingLanguageIcon.trim() === '') {
                            errors.programmingLanguageIcon = 'Language icon cannot be empty';
                        }

                        if (values.programmingLanguageURL.trim() === '') {
                            errors.programmingLanguageURL = 'Language URL cannot be empty';
                        }

                        const urlRegex = /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\\&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/gi;

                        if (values.programmingLanguageIcon.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.programmingLanguageIcon)) {
                                errors.programmingLanguageIcon = 'Language icon is not a valid URL';
                            }
                        }

                        if (values.programmingLanguageURL.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.programmingLanguageURL)) {
                                errors.programmingLanguageURL = 'Language URL is not a valid URL';
                            }
                        }

                        return errors;
                    }}
                >
                    {({ dirty, isValid }) => (
                        <Form className="flex flex-col">
                            <label className="flex flex-col">
                                Programming language name
                                <Field
                                    name="programmingLanguageName"
                                    placeholder="Programming Language Name"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                    autoFocus
                                />
                            </label>
                            <ErrorMessage component="span" name="programmingLanguageName" className="mb-2 text-sm italic text-red-500" />
                            <label className="flex flex-col">
                                Programming language description
                                <Field
                                    name="programmingLanguageDescription"
                                    placeholder="Programming language description"
                                    autoComplete="off"
                                    as="textarea"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage
                                component="span"
                                name="programmingLanguageDescription"
                                className="mb-2 text-sm italic text-red-500"
                            />
                            <label className="flex flex-col">
                                <p>
                                    Programming language icon<span className="text-sm">(This should be a url to the image!)</span>
                                </p>
                                <Field
                                    name="programmingLanguageIcon"
                                    placeholder="Programming Language Icon"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="programmingLanguageIcon" className="mb-2 text-sm italic text-red-500" />
                            <label className="flex flex-col">
                                Programming language URL
                                <Field
                                    name="programmingLanguageURL"
                                    placeholder="Programming language URL"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="programmingLanguageURL" className="mb-2 text-sm italic text-red-500" />

                            <ErrorMessage component="span" name="created" className="mt-4 italic text-red-500 text-md" />
                            <input
                                disabled={!dirty || !isValid}
                                className="px-4 py-2 mt-4 font-bold text-white transition duration-150 bg-blue-500 rounded cursor-pointer hover:bg-blue-400 disabled:bg-blue-300 focus:outline-none focus:shadow-outline ease disabled:cursor-not-allowed"
                                type="submit"
                                value="Create"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
