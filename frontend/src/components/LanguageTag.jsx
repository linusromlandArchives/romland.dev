//External dependencies import
import { Link } from 'react-router-dom';

export default (props) => {
    const { languages, altColor } = props;

    return (
        <Link to={`/language/${languages.programmingLanguageID}`} className="mr-1">
            <div className={`w-full rounded-md flex items-center h-6 ${altColor ? 'bg-gray-200' : 'bg-slate-400'}`}>
                <img
                    src={languages.programmingLanguageIcon}
                    alt={languages.programmingLanguageName + ' icon'}
                    className="w-full h-4 object-cover mx-1"
                />
                <h1 className={`mr-1 ${altColor ? 'text-black' : 'text-white'}`}>{languages.programmingLanguageName}</h1>
            </div>
        </Link>
    );
};
