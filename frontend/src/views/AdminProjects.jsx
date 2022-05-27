//External dependencies import
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/Toast';

export default () => {
    //Initialize the react-router navigator
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [deleteProjectID, setDeleteProject] = useState('');
    const [deleteToastID, setDeleteToastID] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const request = await axios.get('/api/project/');
        const response = await request.data;
        setData(response.data);
    }

    async function deleteProject(projectID) {
        if (projectID == deleteProjectID) {
            setDeleteProject('');
            toast.dismiss(deleteToastID);
            const request = await axios.delete('/api/project', { data: { projectID } });
            const response = await request.data;
            if (response.success) {
                successNotify('Project deleted successfully');
                getData();
            } else {
                errorNotify('Project deletion failed');
            }
        } else {
            toast.dismiss(deleteToastID);
            setDeleteToastID(
                infoNotify('Click again to delete project', {
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeOnClick: false,
                    closeButton: false,
                }),
            );
            setDeleteProject(projectID);
            setTimeout(() => {
                setDeleteProject('');
            }, 3000);
        }
    }

    return (
        <div className="flex w-full justify-center">
            <section className="mt-6 w-full rounded-md bg-slate-200 p-8 md:w-1/2">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold">Projects</h1>
                    <Link
                        to="/admin/project/create"
                        className="ease rounded-md border border-slate-500 bg-slate-300 p-2 text-black transition duration-150 hover:bg-slate-200"
                    >
                        Create a new project
                    </Link>
                </div>
                <ul>
                    {data.map((project) => (
                        <li
                            key={project.projectID}
                            className="my-4 flex items-center justify-between rounded-md border border-slate-500 bg-slate-300 p-4"
                        >
                            <Link to={'/project/' + project.projectID}>
                                <h2 className="text-lg font-semibold">{project.projectName}</h2>
                            </Link>
                            <div className="flex">
                                <MdEdit
                                    size="45px"
                                    className="m-1 cursor-pointer rounded-md border-slate-500 p-2 hover:border"
                                    onClick={() => navigate(`/admin/project/edit/${project.projectID}`)}
                                />
                                <MdClose
                                    size="45px"
                                    className="m-1 cursor-pointer rounded-md border-slate-500 p-2 hover:border"
                                    onClick={() => deleteProject(project.projectID)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
