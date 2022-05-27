//Local dependencies import
import AdminNavbar from '../components/AdminNavbar';

export default function (props) {
    const { children } = props;

    return (
        <div className="min-h-screen w-screen bg-cyan-900">
            <AdminNavbar />
            {children}
        </div>
    );
}
