//External dependencies import
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//Views import
import { Home, About, Admin } from './views';

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} onLeave={test} />
                <Route path="admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );

    function test() {
        console.log('test');
    }
}
