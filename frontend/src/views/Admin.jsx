//External dependencies import
import { useContext, useEffect } from 'react';

//Local dependencies import
import AdminNavbar from '../components/AdminNavbar';
import { projectName } from '../contexts';

export default function (props) {
    const projName = useContext(projectName);
    const { children } = props;

    useEffect(() => {
        document.title = `Admin - ${projName}`;
    }, [projName]);

    return (
        <div className="min-h-screen w-screen bg-cyan-900">
            <AdminNavbar />
            {children}
        </div>
    );
}
