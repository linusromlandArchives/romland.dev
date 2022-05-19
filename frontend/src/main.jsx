//External dependencies import
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

//Local dependencies import
import Router from './router';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router />
    </StrictMode>,
);
