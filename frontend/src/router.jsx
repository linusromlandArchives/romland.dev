//External dependencies import
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//Views import
import { Home, Admin, CreateProject, EditProject } from './views';
import LoginModal from './components/LoginModal';

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="admin/">
                    <Route
                        index
                        element={
                            <>
                                <LoginModal />
                                <Admin />
                            </>
                        }
                    />
                    <Route
                        path="createProject/"
                        element={
                            <>
                                <LoginModal />
                                <CreateProject />
                            </>
                        }
                    />
                    <Route
                        path="editProject/:projectID"
                        element={
                            <>
                                <LoginModal />
                                <EditProject />
                            </>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
