//External dependencies import
import { useEffect, useState, useContext } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

//Local dependencies import
import axios from '../axios';
import FeaturedCard from '../components/FeaturedCard';
import { errorNotify } from '../components/Toast';
import { projectName } from '../contexts';

export default function () {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const projName = useContext(projectName);

    useEffect(() => {
        getData();
        document.title = projName;
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

        if (search.length <= 0) {
            navigate('/search');
            return;
        }

        navigate({
            pathname: '/search',
            search: createSearchParams({
                query: search,
            }).toString(),
        });
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-cyan-900">
            <div className="flex w-10/12 flex-col items-center lg:w-7/12">
                <h1 className="mt-4 text-5xl font-semibold text-white sm:text-6xl">Romland.dev</h1>

                <form className="mt-4 flex w-full flex-col items-center p-2 md:w-8/12" onSubmit={navigateToSearch}>
                    <div className="relative w-full text-gray-600">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="w-full rounded-md bg-gray-200 py-3 pl-10 text-sm text-black focus:outline-none "
                            placeholder="Search projects..."
                            autoComplete="off"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="ease my-2 w-2/3 rounded-md bg-gray-200 p-2 transition duration-150 hover:bg-gray-300 md:w-1/3"
                    >
                        {search.length <= 0 ? 'See projects!' : 'Search'}
                    </button>
                </form>
                <div className="mt-2 flex flex-wrap justify-center">
                    {data.map((project) => (
                        <div
                            className="w-full p-4 lg:w-1/3"
                            style={{
                                maxHeight: '30rem',
                            }}
                            key={project.projectID}
                        >
                            <FeaturedCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
