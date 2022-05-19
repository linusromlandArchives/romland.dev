//External Dependencies Import
import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

//Local Dependencies Import
import { project, projectImages } from '../models';
import { checkAdmin } from '../auth';

//Variable Declarations
const router = Router();

/**
 * @api {get} /api/projectImage/ Send the projectImage with the specified id
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const projectImage = (await projectImages.findOne({
            where: {
                projectImagesID: req.params.id,
            },
        })) as any;
        if (projectImage) {
            res.status(200).sendFile(path.join(path.resolve(), `src/public/uploadedImages/${projectImage.projectImagesFileName}`));
        } else {
            res.status(404).json({
                success: false,

                error: 'Project Image not found',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {post} /api/projectImage/ Create a new projectImage
 */
router.post('/:projectID', checkAdmin, async (req: Request, res: Response) => {
    if (!req.params.projectID) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
        });
    }

    //Find the project by its ID
    const foundProject = await project.findByPk(req.params.projectID);

    //If project is not found, return error
    if (!foundProject) {
        return res.status(400).json({
            success: false,
            error: 'Project not found',
        });
    }

    //If no file is uploaded, return error
    if (!req.files) {
        return res.status(400).json({
            success: false,
            error: 'No files were uploaded',
        });
    }
    const file = req.files.file as any;
    if (!file) {
        return res.status(400).json({
            success: false,
            error: 'No file was uploaded',
        });
    }

    //If file is not an image, return error
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            success: false,
            error: 'File is not an image',
        });
    }

    //If file is too large, return error
    if (file.size > 1000000) {
        return res.status(400).json({
            success: false,
            error: 'File is too large',
        });
    }

    //Move file to uploads folder
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${__dirname}/../public/uploadedImages/${fileName}`;
    file.mv(filePath);

    try {
        const createdProjectImage = await projectImages.create({
            projectID: req.params.projectID,
            projectImagesFileName: fileName,
        });

        res.status(201).json({
            success: true,
            error: '',
            data: createdProjectImage,
        });
    } catch (error: any) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The project image ${fileName} already exists.`,
            });
        }
    }
});

/**
 * @api {delete} /api/projectImage/ Delete a projectImage
 */
router.delete('/', checkAdmin, async (req: Request, res: Response) => {
    if (!req.body.projectImagesID) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
        });
    }

    //Find the project by its ID
    const foundProjectImage = (await projectImages.findByPk(req.body.projectImagesID)) as any;

    //If project is not found, return error
    if (!foundProjectImage) {
        return res.status(400).json({
            success: false,
            error: 'Project image not found',
        });
    }

    //Delete the project image
    await projectImages.destroy({
        where: {
            projectImagesID: req.body.projectImagesID,
        },
    });

    //Delete the image on disk
    const filePath = `${__dirname}/../public/uploadedImages/${foundProjectImage.projectImagesFileName}`;
    fs.unlinkSync(filePath);

    res.status(200).json({
        success: true,
        error: '',
        message: 'Project image deleted',
    });
});

export default router;
