//External dependencies import
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Internal dependencies import
import axios from '../axios';

export default function () {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState(searchParams.get('query'));

    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchParams({
            query: query,
        });
        search();
    }

    async function search() {
        const request = await axios.get('/api/project/', {
            params: {
                projectName: query,
            },
        });
        const response = await request.data;
        setSearchResults(response.data);
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <div className="bg-cyan-900 min-h-screen w-screen flex flex-col items-center">
            <div className="bg-slate-500 w-full md:w-8/12 m-6 flex flex-col items-center">
                <form className="w-full mt-4 p-2" onSubmit={handleSearch}>
                    <div className="relative text-gray-600">
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
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="w-full py-3 text-sm text-black bg-gray-200 rounded-md pl-10 focus:outline-none "
                            placeholder="Search..."
                            autoComplete="off"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </form>
                <div>
                    {searchResults.map((project) => (
                        <div key={project.id}>
                            <h1>{project.projectName}</h1>
                            <p>{project.projectDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
