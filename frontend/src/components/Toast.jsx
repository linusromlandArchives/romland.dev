import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function successNotify(message, options) {
    toast.success(message, { ...options });
}

export function errorNotify(message, options) {
    toast.error(message, { ...options });
}

export default function () {
    return <ToastContainer />;
}
