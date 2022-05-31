//External dependencies import
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

//Internal dependencies import
import axios from '../axios';
import SearchResult from '../components/SearchResult';
import Navbar from '../components/Navbar';
import { projectName } from '../contexts';

export default function () {
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState(searchParams.get('query'));

    const [searchResults, setSearchResults] = useState([]);

    const projName = useContext(projectName);

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
        document.title = `Search - ${projName}`;
    }, []);

    return (
        <div className="min-h-screen w-full bg-cyan-900">
            <Navbar />
            <div className="flex h-full w-full flex-col items-center">
                <div className="m-0 flex h-full w-full flex-col rounded-none bg-transparent py-4 px-6 pt-1 md:m-6 md:min-h-fit md:w-8/12 md:rounded-md md:bg-slate-400">
                    <form className="my-4 w-full" onSubmit={handleSearch}>
                        <div className="relative text-gray-600">
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
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </span>
                            <input
                                type="search"
                                name="q"
                                className="w-full rounded-md bg-gray-200 py-3 pl-10 text-sm text-black focus:outline-none "
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
        </div>
    );
}
