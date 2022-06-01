//External dependencies import
import { useContext, useEffect } from 'react';

//Local dependencies import
import AdminNavbar from '../components/AdminNavbar';
import { projectName as projectNameContext } from '../contexts';

export default function (props) {
    const projectName = useContext(projectNameContext);
    const { children } = props;

    useEffect(() => {
        document.title = `Admin - ${projectName}`;
    }, [projectName]);

    return (
        <div className="min-h-screen w-full bg-cyan-900">
            <AdminNavbar />
            {children}
        </div>
    );
}
