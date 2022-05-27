//External dependencies import
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/';

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
        <div className="flex justify-center w-full">
            <section className="w-full p-8 mt-6 rounded-md md:w-1/2 bg-slate-200">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold">Projects</h1>
                    <Link
                        to="/admin/project/create"
                        className="p-2 text-black transition duration-150 border rounded-md bg-slate-300 hover:bg-slate-200 border-slate-500 ease"
                    >
                        Create a new project
                    </Link>
                </div>
                <ul>
                    {data.map((project) => (
                        <li
                            key={project.projectID}
                            className="flex items-center justify-between p-4 my-4 border rounded-md bg-slate-300 border-slate-500"
                        >
                            <Link to={'/project/' + project.projectID}>
                                <h2 className="text-lg font-semibold">{project.projectName}</h2>
                            </Link>
                            <div className="flex">
                                <MdEdit
                                    size="45px"
                                    className="p-2 m-1 rounded-md cursor-pointer hover:border border-slate-500"
                                    onClick={() => navigate(`/admin/project/edit/${project.projectID}`)}
                                />
                                <MdClose
                                    size="45px"
                                    className="p-2 m-1 rounded-md cursor-pointer hover:border border-slate-500"
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
