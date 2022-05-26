//External dependencies import
import { Link } from 'react-router-dom';

export default (props) => {
    const { languages } = props;

    return (
        <Link to={`/language/${languages.programmingLanguageID}`} className="mr-1">
            <div className="w-full bg-slate-400 rounded-md flex items-center h-6">
                <img
                    src={languages.programmingLanguageIcon}
                    alt={languages.programmingLanguageName + ' icon'}
                    className="w-full h-4 object-cover mx-1"
                />
                <h1 className="text-white mr-1">{languages.programmingLanguageName}</h1>
            </div>
        </Link>
    );
};
