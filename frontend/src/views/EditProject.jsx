//External dependencies import
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Field, ErrorMessage, Form, Formik } from 'formik';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, createRef } from 'react';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/';

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
        <div className="flex justify-center w-full">
            <div className="w-full p-8 mt-6 rounded-md lg:w-8/12 bg-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl font-semibold">Edit a project</h1>
                    <Link
                        to="/admin/project"
                        className="p-2 text-black transition duration-150 border rounded-md bg-slate-300 hover:bg-slate-200 border-slate-500 ease"
                    >
                        Back to admin
                    </Link>
                </div>
                <div className="flex flex-col justify-center md:flex-row">
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
                            <Form className="flex flex-col w-full mt-4 mr-0 lg:w-1/2 md:mr-6 md:mt-0">
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
                                        onChange={(value) => {
                                            setFieldValue('languageIDs', value);
                                        }}
                                        value={values.languageIDs}
                                        name="languageIDs"
                                    />
                                </label>
                                <ErrorMessage component="span" name="languageError" className="mb-2 text-sm italic text-red-500" />

                                <div className="flex">
                                    <label className="flex items-center">
                                        <p>Visible</p>
                                        <Field
                                            name="projectVisible"
                                            type="checkbox"
                                            className="p-2 ml-2 border border-gray-200 rounded-md"
                                        />
                                    </label>
                                    <label className="flex items-center ml-6">
                                        <p>Featured</p>
                                        <Field
                                            name="projectFeatured"
                                            type="checkbox"
                                            className="p-2 ml-2 border border-gray-200 rounded-md"
                                        />
                                    </label>
                                </div>

                                <ErrorMessage component="span" name="created" className="mt-4 italic text-red-500 text-md" />
                                <input
                                    disabled={!isValid}
                                    className="px-4 py-2 mt-4 font-bold text-white transition duration-150 bg-blue-500 rounded cursor-pointer hover:bg-blue-400 disabled:bg-blue-300 focus:outline-none focus:shadow-outline ease disabled:cursor-not-allowed"
                                    type="submit"
                                    value="Save"
                                />
                            </Form>
                        )}
                    </Formik>
                    <div className="w-full ml-0 lg:w-1/2 md:ml-6">
                        <button
                            className="px-4 py-2 m-2 font-bold text-white transition duration-150 bg-blue-500 rounded cursor-pointer hover:bg-blue-400 disabled:bg-blue-300 focus:outline-none focus:shadow-outline ease disabled:cursor-not-allowed"
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
                                    <div key={index} className="flex flex-col items-center w-5/12 p-2 m-2 rounded-md bg-slate-300">
                                        <img
                                            src={'/api/projectImage/' + image.projectImagesID}
                                            alt={image.projectImagesFileName}
                                            className="rounded-md h-28"
                                        />
                                        <button
                                            className="flex items-center justify-center w-full p-1 m-2 font-semibold text-white transition duration-150 bg-red-500 rounded cursor-pointer hover:bg-red-400 disabled:bg-red-300 focus:outline-none focus:shadow-outline ease disabled:cursor-not-allowed"
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
