//External dependencies import
import { useEffect, useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

//Local dependencies import
import axios from '../axios';
import { FeaturedCard, errorNotify } from '../components/';

export default function () {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const request = await axios.get('/api/project/', {
            params: {
                limit: 3,
                featured: true,
                visible: true,
            },
        });
        const response = await request.data;
        if (response.success) {
            setData(response.data);
        } else {
            errorNotify(response.error);
        }
    }

    function navigateToSearch(event) {
        event.preventDefault();
        navigate({
            pathname: '/search',
            search: createSearchParams({
                query: search,
            }).toString(),
        });
    }

    return (
        <div className="bg-cyan-900 min-h-screen w-screen flex flex-col items-center justify-center">
            <div className="w-10/12 lg:w-7/12 flex flex-col items-center">
                <h1 className="text-5xl sm:text-6xl font-semibold text-white mt-4">Romland.dev</h1>

                <form className="w-full md:w-8/12 mt-4 p-2" onSubmit={navigateToSearch}>
                    <div className="relative text-gray-600 ">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="w-full py-3 text-sm text-black bg-gray-200 rounded-md pl-10 focus:outline-none "
                            placeholder="Search projects..."
                            autoComplete="off"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </form>
                <div className="flex flex-wrap mt-2 justify-center">
                    {data.map((project) => (
                        <div className="w-full lg:w-1/3 h-96 p-4" key={project.projectID}>
                            <FeaturedCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
