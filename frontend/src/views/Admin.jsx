//External dependencies import
import { useState } from 'react';

//Local dependencies import
import ProjectsTab from '../components/ProjectsTab';
import LanguagesTab from '../components/LanguagesTab';

export default function () {
    const [activeTab, changeTab] = useState('projects');

    return (
        <div className="bg-teal-700 min-h-screen w-screen">
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
        </div>
    );
}
