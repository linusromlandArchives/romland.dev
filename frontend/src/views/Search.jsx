//External dependencies import
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Internal dependencies import
import axios from '../axios';
import { SearchResult } from '../components/';

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
                visible: true,
            },
        });
        const response = await request.data;
        setSearchResults(response.data);
    }

    useEffect(() => {
        search();
    }, []);

    return (
        <div className="flex flex-col items-center w-screen min-h-screen bg-cyan-900">
            <div className="flex flex-col w-full min-h-screen px-6 py-4 pt-1 m-0 bg-transparent rounded-none md:bg-slate-400 md:w-8/12 md:min-h-fit md:rounded-md md:m-6">
                <Link to="/">
                    <h3 className="mt-4 text-3xl font-semibold text-center text-white md:text-black">Romland.dev</h3>
                </Link>
                <form className="w-full my-4" onSubmit={handleSearch}>
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
                            className="w-full py-3 pl-10 text-sm text-black bg-gray-200 rounded-md focus:outline-none "
                            placeholder="Search..."
                            autoComplete="off"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                </form>
                <div>
                    {searchResults.map((project) => (
                        <SearchResult key={project.id} project={project} />
                    ))}
                    {searchResults.length === 0 && (
                        <div className="text-center text-gray-600">
                            <p>No results found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
