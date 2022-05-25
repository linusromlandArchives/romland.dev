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
        }
    }, [project]);

    function navigateToProject() {
        navigate('/project/' + project.projectID);
    }

    return (
        <div
            className="w-full h-full bg-gray-200 hover:bg-gray-50 transition ease duration-150 rounded-md flex flex-col items-center p-4 cursor-pointer"
            onClick={navigateToProject}
        >
            <img src={image} alt={project.title} className="w-full h-32 object-cover" />
            <h2 className="text-2xl text-black mb-2">{project.projectName}</h2>
            <p className="text-md text-gray-600 overflow-y-scroll hide-scroll">{project.projectDescription}</p>
        </div>
    );
};
