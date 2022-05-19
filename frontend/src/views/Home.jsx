//External dependencies import
import { Link } from 'react-router-dom';

export default function () {
    return (
        <div>
            <h1 className="text-red-500">Home</h1>
            <Link to="/about">About</Link>
        </div>
    );
}
