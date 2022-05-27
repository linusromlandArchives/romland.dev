//External dependencies import
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

//Internal dependencies import
import axios from '../axios';
import { SearchResult } from '../components/';

export default function () {
    const { languageID } = useParams();

    const [query, setQuery] = useState('');

    const [searchResults, setSearchResults] = useState([]);
    const [language, setLanguage] = useState([]);

    function handleSearch(event) {
        event.preventDefault();
        search();
    }

    async function getLanguage() {
        const request = await axios.get(`/api/programmingLanguage/`, {
            params: {
                ids: languageID,
            },
        });
        const response = await request.data;
        console.log(response);
        setLanguage(response.data[0]);
    }

    async function search() {
        const request = await axios.get('/api/project/', {
            params: {
                projectName: query,
                visible: true,
                languageIDs: languageID,
            },
        });
        const response = await request.data;
        setSearchResults(response.data);
    }

    useEffect(() => {
        search();
        getLanguage();
    }, []);

    return (
        <div className="flex flex-col items-center w-screen min-h-screen bg-cyan-900">
            <div className="flex flex-col w-full min-h-screen px-6 py-4 pt-1 m-0 bg-transparent rounded-none md:bg-slate-400 md:w-8/12 md:min-h-fit md:rounded-md md:m-6">
                <div className="flex mt-4 text-white md:text-black">
                    <img className="w-24 h-24" src={language.programmingLanguageIcon} alt={language.programmingLanguageName} />
                    <div className="flex flex-col justify-end ml-2 ">
                        <h3 className="text-3xl font-semibold ">{language.programmingLanguageName}</h3>
                        <p title={language.programmingLanguageDescription}>{language.programmingLanguageDescription}</p>
                        <a
                            className="text-blue-400 underline transition duration-150 md:text-blue-600 hover:text-blue-600 md:hover:text-blue-800 visited:text-purple-400 md:visited:text-purple-600 ease"
                            href={language.programmingLanguageURL}
                        >
                            {language.programmingLanguageName}&#39;s website
                        </a>
                    </div>
                </div>

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
