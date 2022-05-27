//External dependencies import
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

//Local dependencies import
import Router from './router';
import Toast from './components/Toast';

//Import Tailwind CSS
import './styles/tailwind.css';

//Import class to hide the scrollbar
import './styles/hideScroll.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Toast />
        <Router />
    </StrictMode>,
);
