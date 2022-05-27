//External dependencies import
import { Link } from 'react-router-dom';

//Local dependencies import
import LoginModal from './LoginModal';

export default () => {
    return (
        <>
            <LoginModal />
            <nav className="flex h-14 w-full items-center justify-center border-b border-slate-300 bg-white md:justify-between">
                <Link to="/">
                    <h1 className="hidden p-2 text-2xl font-semibold md:block">Admin</h1>
                </Link>
                <ul className="flex w-full justify-around md:w-fit">
                    <li>
                        <Link to="/admin/project" className="text-2xl md:text-xl">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/language" className="mx-0 text-2xl md:mx-4 md:text-xl">
                            Languages
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};
