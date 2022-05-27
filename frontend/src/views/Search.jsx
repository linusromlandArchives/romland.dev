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
        <div className="bg-cyan-900 min-h-screen w-screen flex flex-col items-center">
            <div className="bg-transparent md:bg-slate-400 w-full md:w-8/12 min-h-screen md:min-h-fit rounded-none md:rounded-md py-4 px-6 pt-1 m-0 md:m-6 flex flex-col">
                <Link to="/">
                    <h3 className="text-3xl mt-4 text-center font-semibold text-white md:text-black">Romland.dev</h3>
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
