//External dependencies import

//Local dependencies import
import LoginModal from '../components/LoginModal';

export default function () {
    return (
        <div className="bg-orange-600 h-screen w-screen">
            <LoginModal />
            <a href="/api/auth/logout">Logout</a>
        </div>
    );
}
