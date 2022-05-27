//External dependencies import
import { Link } from 'react-router-dom';

export default (props) => {
    const { languages, altColor } = props;

    return (
        <Link to={`/language/${languages.programmingLanguageID}`} className="mr-1">
            <div className={`flex h-6 w-full items-center rounded-md ${altColor ? 'bg-gray-200' : 'bg-slate-400'}`}>
                <img
                    src={languages.programmingLanguageIcon}
                    alt={languages.programmingLanguageName + ' icon'}
                    className="mx-1 h-4 w-full object-cover"
                />
                <h1 className={`mr-1 ${altColor ? 'text-black' : 'text-white'}`}>{languages.programmingLanguageName}</h1>
            </div>
        </Link>
    );
};
