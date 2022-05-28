//External dependencies import
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/Toast';

export default () => {
    //Initialize the react-router navigator
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [deleteLanguageID, setDeleteLanguageID] = useState('');
    const [deleteToastID, setDeleteToastID] = useState('');

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const request = await axios.get('/api/programmingLanguage/');
        const response = await request.data;
        setData(response.data);
    }

    async function deleteLanguage(languageID) {
        if (languageID == deleteLanguageID) {
            setDeleteLanguageID('');
            toast.dismiss(deleteToastID);
            const request = await axios.delete('/api/programmingLanguage', { data: { programmingLanguageID: languageID } });
            const response = await request.data;
            if (response.success) {
                successNotify('Language deleted successfully');
                getData();
            } else {
                errorNotify('Language deletion failed');
            }
        } else {
            toast.dismiss(deleteToastID);
            setDeleteToastID(
                infoNotify('Click again to delete language', {
                    autoClose: 3000,
                    pauseOnHover: false,
                    closeOnClick: false,
                    closeButton: false,
                }),
            );
            setDeleteLanguageID(languageID);
            setTimeout(() => {
                setDeleteLanguageID('');
            }, 3000);
        }
    }

    return (
        <div className="flex w-full justify-center">
            <section className="mt-6 w-full rounded-md bg-slate-200 p-8 md:w-1/2">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold">Programming Languages</h1>
                    <Link
                        to="/admin/language/create"
                        className="ease rounded-md border border-slate-500 bg-slate-300 p-2 text-black transition duration-150 hover:bg-slate-200"
                    >
                        Create a new Language
                    </Link>
                </div>
                <ul>
                    {data.map((language) => (
                        <li
                            key={language.programmingLanguageID}
                            className="my-4 flex items-center justify-between rounded-md border border-slate-500 bg-slate-300 p-4"
                        >
                            <Link to={`/language/${language.programmingLanguageID}`}>
                                <div className="flex items-center">
                                    <img
                                        className="h-12 w-12 rounded-lg object-scale-down"
                                        src={language.programmingLanguageIcon}
                                        alt={language.name + ' Icon'}
                                    />
                                    <h2 className="ml-4 text-lg font-semibold ">{language.programmingLanguageName}</h2>
                                </div>
                            </Link>
                            <div className="flex">
                                <MdEdit
                                    size="45px"
                                    className="m-1 cursor-pointer rounded-md border-slate-500 p-2 hover:border"
                                    onClick={() => navigate(`/admin/language/edit/${language.programmingLanguageID}`)}
                                />
                                <MdClose
                                    size="45px"
                                    className="m-1 cursor-pointer rounded-md border-slate-500 p-2 hover:border"
                                    onClick={() => deleteLanguage(language.programmingLanguageID)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
