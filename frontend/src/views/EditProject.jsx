//External dependencies import
import Select from 'react-select';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Local dependencies import
import axios from '../axios';
import { successNotify, errorNotify } from '../components/Toast';

export default () => {
    const { projectID } = useParams();

    const [languages, setLanguages] = useState([]);
    const [activeLanguages, setActiveLanguages] = useState([]);
    const [project, setProject] = useState({});

    useEffect(() => {
        getLanguages();
        getProject();
    }, []);

    async function getProject() {
        const request = await axios.get(`/api/project/`, { body: { ids: projectID } });
        const response = await request.data;
        if (response.success) {
            if (response.data[0].programmingLanguages) {
                const formattedLanguages = response.data[0].programmingLanguages.map((language) => ({
                    value: language.programmingLanguageID,
                    label: language.programmingLanguageName,
                }));
                setActiveLanguages(formattedLanguages);
                setProject(response.data[0]);
            }
        } else {
            errorNotify(response.error);
        }
    }

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
        <div className="bg-teal-700 min-h-screen w-screen flex items-center justify-center">
            <div className="w-full md:w-1/2 rounded-md bg-slate-200 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold">Edit a project</h1>
                    <Link
                        to="/admin"
                        className="text-black bg-slate-300 hover:bg-slate-200 border-slate-500 border rounded-md p-2 transition duration-150 ease"
                    >
                        Back to admin
                    </Link>
                </div>
                <div className="flex justify-between items-center">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            projectName: project.projectName || '',
                            projectDescription: project.projectDescription || '',
                            projectSourceCodeURL: project.projectSourceCodeURL || '',
                            projectURL: project.projectURL || '',
                            languageIDs: activeLanguages || [],
                            languageError: '',
                            updated: '',
                        }}
                        onSubmit={async (values, { setErrors }) => {
                            const request = await axios.put('/api/project/', {
                                projectID,
                                projectName: values.projectName,
                                projectDescription: values.projectDescription,
                                projectSourceCodeURL: values.projectSourceCodeURL,
                                projectURL: values.projectURL,
                                languageIDs: values.languageIDs.map((language) => language.value),
                            });
                            const response = await request.data;
                            if (response.success) {
                                successNotify('Project updated', {
                                    theme: 'colored',
                                    position: 'top-right',
                                });
                            } else {
                                setErrors({
                                    updated: response.error,
                                });
                                errorNotify('Error when updating project', {
                                    theme: 'colored',
                                    position: 'top-right',
                                });
                            }
                        }}
                        validate={(values) => {
                            const errors = {};

                            if (values.projectName !== undefined && values.projectName.trim() === '') {
                                errors.projectName = 'Project name cannot be empty';
                            }

                            if (values.projectDescription !== undefined && values.projectDescription.trim() === '') {
                                errors.projectDescription = 'Project description cannot be empty';
                            }

                            if (values.projectSourceCodeURL !== undefined && values.projectSourceCodeURL.trim() === '') {
                                errors.projectSourceCodeURL = 'Project Source Code URL cannot be empty';
                            }

                            if (values.projectURL !== undefined && values.projectURL.trim() === '') {
                                errors.projectURL = 'Project URL cannot be empty';
                            }

                            const urlRegex = /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\\&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/gi;

                            if (values.projectSourceCodeURL !== undefined && values.projectSourceCodeURL.trim() !== '') {
                                if (!new RegExp(urlRegex).test(values.projectSourceCodeURL)) {
                                    errors.projectSourceCodeURL = 'Project Source Code URL is not a valid URL';
                                }
                            }

                            if (values.projectURL !== undefined && values.projectURL.trim() !== '') {
                                if (!new RegExp(urlRegex).test(values.projectURL)) {
                                    errors.projectURL = 'Project URL is not a valid URL';
                                }
                            }

                            if (values.languageIDs && values.languageIDs.length <= 0) {
                                errors.languageError = 'Please select at least one programming language';
                            }

                            return errors;
                        }}
                    >
                        {({ values, setFieldValue, isValid }) => (
                            <Form className="flex flex-col">
                                <label className="flex flex-col">
                                    Project name
                                    <Field
                                        name="projectName"
                                        placeholder="Project name"
                                        autoComplete="off"
                                        className="border border-gray-200 p-2 rounded-md"
                                        autoFocus
                                    />
                                </label>
                                <ErrorMessage component="span" name="projectName" className="text-red-500 text-sm mb-2 italic" />
                                <label className="flex flex-col">
                                    Project description
                                    <Field
                                        name="projectDescription"
                                        placeholder="Project description"
                                        autoComplete="off"
                                        className="border border-gray-200 p-2 rounded-md"
                                    />
                                </label>
                                <ErrorMessage component="span" name="projectDescription" className="text-red-500 text-sm mb-2 italic" />
                                <label className="flex flex-col">
                                    <p>
                                        Project Source Code URL <span className="text-sm">(ex. to the project&#39;s Git repository)</span>
                                    </p>
                                    <Field
                                        name="projectSourceCodeURL"
                                        placeholder="Project Source Code URL"
                                        autoComplete="off"
                                        className="border border-gray-200 p-2 rounded-md"
                                    />
                                </label>
                                <ErrorMessage component="span" name="projectSourceCodeURL" className="text-red-500 text-sm mb-2 italic" />
                                <label className="flex flex-col">
                                    Project URL (ex. to demo)
                                    <Field
                                        name="projectURL"
                                        placeholder="Project URL"
                                        autoComplete="off"
                                        className="border border-gray-200 p-2 rounded-md"
                                    />
                                </label>
                                <ErrorMessage component="span" name="projectURL" className="text-red-500 text-sm mb-2 italic" />

                                <label className="flex flex-col">
                                    <p>
                                        Programming Languages <span className="text-sm"> (select at least one)</span>
                                    </p>
                                    <Field
                                        component={Select}
                                        isMulti={true}
                                        options={languages}
                                        onChange={(value) => {
                                            setFieldValue('languageIDs', value);
                                        }}
                                        value={values.languageIDs}
                                        name="languageIDs"
                                    />
                                </label>
                                <ErrorMessage component="span" name="languageError" className="text-red-500 text-sm mb-2 italic" />

                                <ErrorMessage component="span" name="created" className="text-red-500 text-md mt-4 italic" />
                                <input
                                    disabled={!isValid}
                                    className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed"
                                    type="submit"
                                    value="Save"
                                />
                            </Form>
                        )}
                    </Formik>
                    <div>
                        <h1>Project images here</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
