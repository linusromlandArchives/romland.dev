import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    autoClose: 3000,
    theme: 'colored',
    pauseOnFocusLoss: false,
};

export function successNotify(message, options) {
    return toast.success(message, { ...defaultOptions, ...options });
}

export function errorNotify(message, options) {
    return toast.error(message, { ...defaultOptions, ...options });
}

export function infoNotify(message, options) {
    return toast.info(message, { ...defaultOptions, ...options });
}

export default function () {
    return <ToastContainer />;
}
