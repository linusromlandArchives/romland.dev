//External dependencies import
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdClose, MdEdit } from 'react-icons/md';

//Local dependencies import
import axios from '../axios';

export default () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const request = await axios.get('/api/project/');
            const response = await request.data;
            setData(response.data);
        })();
    }, []);

    return (
        <section className="w-full md:w-1/2 rounded-md bg-slate-200 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-semibold">Projects</h1>
                <Link
                    to="/admin/createProject"
                    className="text-black bg-slate-300 hover:bg-slate-200 border-slate-500 border rounded-md p-2 transition duration-150 ease"
                >
                    Create a new project
                </Link>
            </div>
            <ul>
                {data.map((project) => (
                    <li
                        key={project.projectID}
                        className="my-4 p-4 rounded-md bg-slate-300 border-slate-500 border flex items-center justify-between"
                    >
                        <h2 className="text-lg font-semibold">{project.projectName}</h2>
                        <div className="flex">
                            <MdEdit size="45px" className="m-1 p-2 rounded-md hover:border border-slate-500  cursor-pointer" />
                            <MdClose size="45px" className="m-1 p-2 rounded-md hover:border border-slate-500  cursor-pointer" />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
