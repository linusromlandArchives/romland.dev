//External dependencies import
import { Link } from 'react-router-dom';

//Local dependencies import
import LoginModal from './LoginModal';

export default () => {
    return (
        <>
            <LoginModal />
            <nav className="bg-white w-full h-14 border-slate-300 border-b flex items-center justify-center md:justify-between">
                <Link to="/">
                    <h1 className="text-2xl font-semibold p-2 hidden md:block">Admin</h1>
                </Link>
                <ul className="flex w-full md:w-fit justify-around">
                    <li>
                        <Link to="/admin/project" className="text-2xl md:text-xl">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/language" className="mx-0 md:mx-4 text-2xl md:text-xl">
                            Languages
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};
