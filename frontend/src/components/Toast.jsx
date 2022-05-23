import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function successNotify(message, options) {
    return toast.success(message, { ...options });
}

export function errorNotify(message, options) {
    return toast.error(message, { ...options });
}

export function infoNotify(message, options) {
    return toast.info(message, { ...options });
}

export default function () {
    return <ToastContainer />;
}
