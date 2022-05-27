//External dependencies import
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

//Local dependencies import
import axios from '../axios';
import { successNotify, infoNotify, errorNotify } from '../components/';

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
        <div className="flex justify-center w-full">
            <section className="w-full p-8 mt-6 rounded-md md:w-1/2 bg-slate-200">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-semibold">Programming Languages</h1>
                    <Link
                        to="/admin/language/create"
                        className="p-2 text-black transition duration-150 border rounded-md bg-slate-300 hover:bg-slate-200 border-slate-500 ease"
                    >
                        Create a new Language
                    </Link>
                </div>
                <ul>
                    {data.map((language) => (
                        <li
                            key={language.programmingLanguageID}
                            className="flex items-center justify-between p-4 my-4 border rounded-md bg-slate-300 border-slate-500"
                        >
                            <Link to={`/language/${language.programmingLanguageID}`}>
                                <div className="flex items-center">
                                    <img
                                        className="object-scale-down w-12 h-12 rounded-lg"
                                        src={language.programmingLanguageIcon}
                                        alt={language.name + ' Icon'}
                                    />
                                    <h2 className="ml-4 text-lg font-semibold ">{language.programmingLanguageName}</h2>
                                </div>
                            </Link>
                            <div className="flex">
                                <MdEdit
                                    size="45px"
                                    className="p-2 m-1 rounded-md cursor-pointer hover:border border-slate-500"
                                    onClick={() => navigate(`/admin/language/edit/${language.programmingLanguageID}`)}
                                />
                                <MdClose
                                    size="45px"
                                    className="p-2 m-1 rounded-md cursor-pointer hover:border border-slate-500"
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
