//External dependencies import
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default (props) => {
    const navigate = useNavigate();
    const { project } = props;

    const [image, setImage] = useState('');

    useEffect(() => {
        if (project && project.projectImages && project.projectImages.length > 0) {
            setImage('/api/projectImage/' + project.projectImages[0].projectImagesID);
        } else {
            setImage('/api/projectImage/noImage');
        }
    }, [project]);

    function navigateToProject() {
        navigate('/project/' + project.projectID);
    }

    return (
        <div
            className="ease flex h-full w-full cursor-pointer flex-col items-center rounded-md bg-gray-200 p-4 transition duration-150 hover:bg-gray-50"
            onClick={navigateToProject}
        >
            <img src={image} alt={project.projectName} className="aspect-video w-full" />
            <h2 className="mb-2 text-2xl text-black">{project.projectName}</h2>
            <p className="hide-scroll overflow-y-scroll text-gray-600">{project.projectDescription}</p>
        </div>
    );
};
