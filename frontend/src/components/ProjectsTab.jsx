//External dependencies import
import { useEffect, useState } from 'react';
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
        <section className="w-full md:w-1/2">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <ul>
                {data.map((project) => (
                    <li key={project.projectID} className="my-4 p-4 rounded-md bg-zinc-200  flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{project.projectName}</h2>
                        <div className="flex">
                            <MdEdit size="45px" className="m-1 p-2 rounded-md hover:bg-zinc-300 transition duration-150" />
                            <MdClose size="45px" className="m-1 p-2 rounded-md hover:bg-zinc-300 transition duration-150" />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};
