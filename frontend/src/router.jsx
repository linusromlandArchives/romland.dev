//External dependencies import
import { Routes, Route, BrowserRouter } from 'react-router-dom';

//Views import
import { Home, Admin, AdminProjects, AdminLanguages, CreateProject, CreateLanguage, EditProject, EditLanguage } from './views';

export default function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="admin/">
                    <Route path="project/">
                        <Route
                            index
                            element={
                                <Admin>
                                    <AdminProjects />
                                </Admin>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <Admin>
                                    <CreateProject />
                                </Admin>
                            }
                        />
                        <Route
                            path="edit/:projectID"
                            element={
                                <Admin>
                                    <EditProject />
                                </Admin>
                            }
                        />
                    </Route>
                    <Route path="language/">
                        <Route
                            index
                            element={
                                <Admin>
                                    <AdminLanguages />
                                </Admin>
                            }
                        />
                        <Route
                            path="create"
                            element={
                                <Admin>
                                    <CreateLanguage />
                                </Admin>
                            }
                        />
                        <Route
                            path="edit/:languageID"
                            element={
                                <Admin>
                                    <EditLanguage />
                                </Admin>
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
