//External dependencies import
import { Link } from 'react-router-dom';

//Local dependencies import
import { LoginModal } from './';

export default () => {
    return (
        <>
            <LoginModal />
            <nav className="flex items-center justify-center w-full bg-white border-b h-14 border-slate-300 md:justify-between">
                <Link to="/">
                    <h1 className="hidden p-2 text-2xl font-semibold md:block">Admin</h1>
                </Link>
                <ul className="flex justify-around w-full md:w-fit">
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
