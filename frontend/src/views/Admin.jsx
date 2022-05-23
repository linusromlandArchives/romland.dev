//External dependencies import
import { useState } from 'react';

//Local dependencies import
import LoginModal from '../components/LoginModal';
import ProjectsTab from '../components/ProjectsTab';
import LanguagesTab from '../components/LanguagesTab';

export default function () {
    const [activeTab, changeTab] = useState('projects');

    return (
        <>
            <LoginModal />
            <nav>
                <ul>
                    <li>
                        <button onClick={() => changeTab('projects')}>Projects</button>
                    </li>
                    <li>
                        <button onClick={() => changeTab('languages')}>Languages</button>
                    </li>
                </ul>
            </nav>
            <div className="w-full flex justify-center">
                {activeTab === 'projects' && <ProjectsTab />}
                {activeTab === 'languages' && <LanguagesTab />}
            </div>
        </>
    );
}
