//External dependencies import
import Select from 'react-select';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Local dependencies import
import axios from '../axios';
import { successNotify, errorNotify } from '../components/';

export default () => {
    const navigate = useNavigate();

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getLanguages();
    }, []);

    async function getLanguages() {
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
        }
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-full p-8 mt-6 rounded-md md:w-1/2 bg-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-semibold">Create project</h1>
                    <Link
                        to="/admin/project"
                        className="p-2 text-black transition duration-150 border rounded-md bg-slate-300 hover:bg-slate-200 border-slate-500 ease"
                    >
                        Back to admin
                    </Link>
                </div>
                <Formik
                    initialValues={{
                        projectName: '',
                        projectDescription: '',
                        projectSourceCodeURL: '',
                        projectURL: '',
                        languageIDs: [],
                        languageError: '',
                        created: '',
                    }}
                    onSubmit={async (values, { setErrors }) => {
                        const request = await axios.post('/api/project/', values);
                        const response = await request.data;
                        if (response.success) {
                            successNotify('Project created');
                            navigate('/admin/project');
                        } else {
                            setErrors({
                                created: response.error,
                            });
                            errorNotify('Error when creating project');
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

                        const urlRegex = /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\\&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/gi;

                        if (values.projectSourceCodeURL.trim() !== '' && values.projectSourceCodeURL.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.projectSourceCodeURL)) {
                                errors.projectSourceCodeURL = 'Project Source Code URL is not a valid URL';
                            }
                        }

                        if (values.projectURL.trim() !== '' && values.projectURL.trim() !== '') {
                            if (!new RegExp(urlRegex).test(values.projectURL)) {
                                errors.projectURL = 'Project URL is not a valid URL';
                            }
                        }

                        if (values.languageIDs.length <= 0) {
                            errors.languageError = 'Please select at least one programming language';
                        }

                        return errors;
                    }}
                >
                    {({ setFieldValue, dirty, isValid }) => (
                        <Form className="flex flex-col">
                            <label className="flex flex-col">
                                Project name
                                <Field
                                    name="projectName"
                                    placeholder="Project name"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                    autoFocus
                                />
                            </label>
                            <ErrorMessage component="span" name="projectName" className="mb-2 text-sm italic text-red-500" />
                            <label className="flex flex-col">
                                Project description
                                <Field
                                    name="projectDescription"
                                    placeholder="Project description"
                                    autoComplete="off"
                                    as="textarea"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="projectDescription" className="mb-2 text-sm italic text-red-500" />
                            <label className="flex flex-col">
                                <p>
                                    Project Source Code URL <span className="text-sm">(ex. to the project&#39;s Git repository)</span>
                                </p>
                                <Field
                                    name="projectSourceCodeURL"
                                    placeholder="Project Source Code URL"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="projectSourceCodeURL" className="mb-2 text-sm italic text-red-500" />
                            <label className="flex flex-col">
                                Project URL (ex. to demo)
                                <Field
                                    name="projectURL"
                                    placeholder="Project URL"
                                    autoComplete="off"
                                    className="p-2 border border-gray-200 rounded-md"
                                />
                            </label>
                            <ErrorMessage component="span" name="projectURL" className="mb-2 text-sm italic text-red-500" />

                            <label className="flex flex-col">
                                <p>
                                    Programming Languages <span className="text-sm"> (select at least one)</span>
                                </p>
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
                                />
                            </label>
                            <ErrorMessage component="span" name="languageError" className="mb-2 text-sm italic text-red-500" />

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
