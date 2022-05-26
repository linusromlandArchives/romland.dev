//External dependencies import
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Local dependencies import
import LanguageTag from './LanguageTag';

export default (props) => {
    const { project } = props;

    const [image, setImage] = useState('');

    useEffect(() => {
        if (project && project.projectImages && project.projectImages.length > 0) {
            setImage('/api/projectImage/' + project.projectImages[0].projectImagesID);
        } else {
            setImage('/api/projectImage/noImage');
        }
    }, [project]);

    return (
        <Link to={`/project/${project.projectID}`}>
            <div className="w-full bg-slate-200 hover:bg-slate-100 transition ease duration-150 rounded-md p-2 my-2 flex items-center">
                <img src={image} alt={project.projectName} className="w-44 h-28 object-cover" />
                <div className="ml-4 h-28 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl h-8 font-semibold" title={project.projectName}>
                            {project.projectName}
                        </h1>
                        <p className="text-base h-12 overflow-hidden" title={project.projectDescription}>
                            {project.projectDescription}
                        </p>
                    </div>
                    <div className="flex">
                        {project.programmingLanguages.map((language) => (
                            <LanguageTag key={language.programmingLanguageID} languages={language} />
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};
