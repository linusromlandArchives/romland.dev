//Local dependencies import
import { AdminNavbar } from '../components/';

export default function (props) {
    const { children } = props;

    return (
        <div className="w-screen min-h-screen bg-cyan-900">
            <AdminNavbar />
            {children}
        </div>
    );
}
