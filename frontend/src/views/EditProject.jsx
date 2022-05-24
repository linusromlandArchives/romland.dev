//External dependencies import
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, createRef } from 'react';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/Toast';

export default () => {
    const { projectID } = useParams();

    const [languages, setLanguages] = useState([]);
    const [activeLanguages, setActiveLanguages] = useState([]);
    const [project, setProject] = useState({});
    const [deleteImageID, setDeleteImageID] = useState('');
    const [deleteToastID, setDeleteToastID] = useState('');
    const uploadInput = createRef();

    useEffect(() => {
        getLanguages();
        getProject();

        uploadInput.current.addEventListener('change', handleFileUpload);
    }, []);

    async function handleFileUpload(e) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        const request = await axios.post('/api/projectImage/' + projectID, formData);
        const response = await request.data;
        if (response.success) {
            successNotify('Image uploaded successfully', {
                theme: 'colored',
            });
            getProject();
        } else {
            errorNotify('Image upload failed', {
                theme: 'colored',
            });
        }
    }

    async function deleteProjectImage(projectImagesID) {
        if (deleteImageID == projectImagesID) {
            setDeleteImageID('');
            toast.dismiss(deleteToastID);
            const request = await axios.delete('/api/projectImage', { data: { projectImagesID } });
            const response = await request.data;
            if (response.success) {
                successNotify('Image deleted successfully', {
                    theme: 'colored',
                });
                getProject();
            } else {
                errorNotify('Image deletion failed', {
                    theme: 'colored',
                });
            }
        } else {
            toast.dismiss(deleteToastID);
            setDeleteToastID(
                infoNotify('Click again to delete image', {
                    duration: 3000,
                    theme: 'colored',
                }),
            );
            setDeleteImageID(projectImagesID);
            setTimeout(() => {
                setDeleteImageID('');
            }, 3000);
        }
    }

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
            <div className="w-full lg:w-1/2 rounded-md bg-slate-200 p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-semibold">Edit a project</h1>
                    <Link
                        to="/admin"
                        className="text-black bg-slate-300 hover:bg-slate-200 border-slate-500 border rounded-md p-2 transition duration-150 ease"
                    >
                        Back to admin
                    </Link>
                </div>
                <div className="flex justify-center flex-col md:flex-row">
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
                            <Form className="flex flex-col w-full md:w-1/2 mr-0 md:mr-6 mt-4 md:mt-0">
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
                                        as="textarea"
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
                    <div className="w-full md:w-1/2 ml-0 md:ml-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => {
                                uploadInput.current.click();
                            }}
                        >
                            Upload Image
                        </button>
                        <input type="file" accept="image/*" className="hidden" ref={uploadInput} />

                        <div className="flex flex-wrap">
                            {project &&
                                project.projectImages &&
                                project.projectImages.length > 0 &&
                                project.projectImages.map((image, index) => (
                                    <div key={index} className="w-5/12 m-2 flex flex-col items-center bg-slate-300 rounded-md p-2">
                                        <img
                                            src={'/api/projectImage/' + image.projectImagesID}
                                            alt={image.projectImagesFileName}
                                            className="h-28 rounded-md"
                                        />
                                        <button
                                            className="bg-red-500 hover:bg-red-400 disabled:bg-red-300 m-2 text-white font-semibold p-1 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center w-full justify-center"
                                            onClick={() => {
                                                deleteProjectImage(image.projectImagesID);
                                            }}
                                        >
                                            <p>Delete</p>
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
