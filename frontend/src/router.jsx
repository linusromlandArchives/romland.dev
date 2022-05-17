//External dependencies import
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

//Views import
import Home from './views/Home';
import About from './views/About';

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
