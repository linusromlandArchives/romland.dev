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
            className="flex flex-col items-center w-full h-full p-4 transition duration-150 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-50 ease"
            onClick={navigateToProject}
        >
            <img src={image} alt={project.projectName} className="object-cover w-full h-32" />
            <h2 className="mb-2 text-2xl text-black">{project.projectName}</h2>
            <p className="overflow-y-scroll text-gray-600 text-md hide-scroll">{project.projectDescription}</p>
        </div>
    );
};
