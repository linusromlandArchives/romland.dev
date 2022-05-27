//External dependencies import
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

//Local dependencies import
import { LanguageTag } from '../components/';

export default () => {
    const { projectID } = useParams();

    const [project, setProject] = useState({});
    const [images, setImages] = useState([]);

    async function getProject() {
        const request = await fetch(`/api/project?ids=${projectID}`);
        const response = await request.json();
        setProject(response.data[0]);

        const formatedImages = response.data[0].projectImages.map((image) => {
            return {
                original: `/api/projectImage/${image.projectImagesID}`,
                thumbnail: `/api/projectImage/${image.projectImagesID}`,
            };
        });

        if (formatedImages.length > 0) setImages(formatedImages);
        else
            setImages([
                {
                    original: '/api/projectImage/noImage',
                    thumbnail: '/api/projectImage/noImage',
                },
            ]);
    }

    useEffect(() => {
        getProject();
    }, []);

    return (
        <div className="flex flex-col items-center w-screen min-h-screen bg-cyan-900">
            <div className="flex flex-col w-full min-h-screen px-6 py-4 pt-1 m-0 bg-transparent rounded-none md:bg-slate-400 md:w-8/12 md:min-h-fit md:rounded-md md:m-6">
                <ImageGallery
                    items={images}
                    showNav={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showThumbnails={project.projectImages && project.projectImages.length == 0 ? false : true}
                />
                <div className="flex flex-col justify-end ml-2 text-white md:text-black">
                    <h3 className="text-3xl font-semibold ">{project.projectName}</h3>
                    <p title={project.projectDescription}>{project.projectDescription}</p>
                    <div className="flex justify-end mt-2">
                        {project.projectURL && (
                            <a
                                className="px-4 py-2 mr-4 font-semibold text-black transition duration-150 rounded-md bg-slate-200 hover:bg-slate-300 ease"
                                href={project.projectURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Demo
                            </a>
                        )}
                        {project.projectSourceCodeURL && (
                            <a
                                className="px-4 py-2 font-semibold text-black transition duration-150 rounded-md bg-slate-200 hover:bg-slate-300 ease"
                                href={project.projectSourceCodeURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Source Code
                            </a>
                        )}
                    </div>
                    <div className="flex mt-2">
                        {project.programmingLanguages &&
                            project.programmingLanguages.map((language) => (
                                <LanguageTag key={language.programmingLanguageID} languages={language} altColor={true} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
