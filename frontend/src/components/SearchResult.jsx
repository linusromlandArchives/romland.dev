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
            <div className="ease my-2 flex w-full items-center rounded-md bg-slate-200 p-2 transition duration-150 hover:bg-slate-100">
                <img src={image} alt={project.projectName} className="h-28 w-44 object-cover" />
                <div className="ml-4 flex h-28 flex-col justify-between">
                    <div>
                        <h1 className="h-8 text-2xl font-semibold" title={project.projectName}>
                            {project.projectName}
                        </h1>
                        <p className="h-12 overflow-hidden text-base" title={project.projectDescription}>
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
