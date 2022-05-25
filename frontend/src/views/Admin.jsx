//Local dependencies import
import AdminNavbar from '../components/AdminNavbar';

export default function (props) {
    const { children } = props;

    return (
        <div className="bg-cyan-900 min-h-screen w-screen">
            <AdminNavbar />
            {children}
        </div>
    );
}
