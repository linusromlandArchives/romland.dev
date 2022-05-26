//External dependencies import
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, createRef } from 'react';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/Toast';

export default () => {
    const navigate = useNavigate();
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
            successNotify('Image uploaded successfully');
            getProject();
        } else {
            errorNotify('Image upload failed');
        }
    }

    async function deleteProjectImage(projectImagesID) {
        if (deleteImageID == projectImagesID) {
            setDeleteImageID('');
            toast.dismiss(deleteToastID);
            const request = await axios.delete('/api/projectImage', { data: { projectImagesID } });
            const response = await request.data;
            if (response.success) {
                successNotify('Image deleted successfully');
                getProject();
            } else {
                errorNotify('Image deletion failed');
            }
        } else {
            toast.dismiss(deleteToastID);
            setDeleteToastID(
                infoNotify('Click again to delete image', {
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeOnClick: false,
                    closeButton: false,
                }),
            );
            setDeleteImageID(projectImagesID);
            setTimeout(() => {
                setDeleteImageID('');
            }, 3000);
        }
    }

    async function getProject() {
        const request = await axios.get(`/api/project/`, { params: { ids: projectID } });
        const response = await request.data;
        if (response.success) {
            if (response.data.length <= 0) navigate('/admin/project');

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
        <div className="w-full flex justify-center">
            <div className="w-full lg:w-8/12 rounded-md bg-slate-200 p-8 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-semibold">Edit a project</h1>
                    <Link
                        to="/admin/project"
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
                            projectVisible: project.projectVisible || false,
                            projectFeatured: project.projectFeatured || false,
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
                                projectVisible: values.projectVisible,
                                projectFeatured: values.projectFeatured,
                                languageIDs: values.languageIDs.map((language) => language.value),
                            });
                            const response = await request.data;
                            if (response.success) {
                                successNotify('Project updated');
                                getProject();
                            } else {
                                setErrors({
                                    updated: response.error,
                                });
                                errorNotify('Error when updating project');
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

                            const urlRegex = /((?:(?:http?)[s]*:\/\/)?[a-z0-9-%\\&=?.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?)/gi;

                            if (
                                values.projectSourceCodeURL !== undefined &&
                                values.projectSourceCodeURL.trim() !== '' &&
                                values.projectSourceCodeURL.trim() !== ''
                            ) {
                                if (!new RegExp(urlRegex).test(values.projectSourceCodeURL)) {
                                    errors.projectSourceCodeURL = 'Project Source Code URL is not a valid URL';
                                }
                            }

                            if (values.projectURL !== undefined && values.projectURL.trim() !== '' && values.projectURL.trim() !== '') {
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
                            <Form className="flex flex-col w-full lg:w-1/2 mr-0 md:mr-6 mt-4 md:mt-0">
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

                                <div className="flex">
                                    <label className="flex items-center">
                                        <p>Visible</p>
                                        <Field
                                            name="projectVisible"
                                            type="checkbox"
                                            className="ml-2 border border-gray-200 p-2 rounded-md"
                                        />
                                    </label>
                                    <label className="flex items-center ml-6">
                                        <p>Featured</p>
                                        <Field
                                            name="projectFeatured"
                                            type="checkbox"
                                            className="ml-2 border border-gray-200 p-2 rounded-md"
                                        />
                                    </label>
                                </div>

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
                    <div className="w-full lg:w-1/2 ml-0 md:ml-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 m-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease duration-150 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => {
                                uploadInput.current.click();
                            }}
                        >
                            Upload Image
                        </button>
                        <input type="file" accept="image/*" className="hidden" ref={uploadInput} />

                        <div className="flex flex-wrap overflow-y-none md:overflow-y-scroll max-h-max md:max-h-96">
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
