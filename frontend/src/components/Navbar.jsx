//External dependencies import
import { Link } from 'react-router-dom';

export default () => {
    return (
        <nav className="flex h-14 w-full items-center justify-between border-b border-slate-300 bg-white">
            <Link to="/">
                <h1 className="ml-4 text-2xl font-semibold">Romland.Dev</h1>
            </Link>
            <Link to="/search" className="mr-4 text-2xl md:text-xl">
                Search
            </Link>
        </nav>
    );
};
