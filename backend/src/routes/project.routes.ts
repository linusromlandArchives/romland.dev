//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { project, projectImages, programmingLanguage } from '../models/models';

//Variable Declarations
const router = Router();

/**
 * @api {get} /api/project/ Returns all projects
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const projects = await project.findAll({
            include: [projectImages, programmingLanguage],
        });
        res.json({
            success: true,
            error: '',
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
});

/**
 * @api {post} /api/project/ Create a new project
 */
router.post('/', async (req: Request, res: Response) => {
    if (
        !req.body.projectName ||
        !req.body.projectDescription ||
        !req.body.projectSourceCodeURL ||
        !req.body.projectURL ||
        !req.body.languageIDs
    ) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
        });
    }

    try {
        const createdProject = (await project.create({
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription,
            projectSourceCodeURL: req.body.projectSourceCodeURL,
            projectURL: req.body.projectURL,
        })) as any;

        await createdProject.addProgrammingLanguages(
            await programmingLanguage.findAll({
                where: {
                    programmingLanguageID: req.body.languageIDs,
                },
            }),
        );

        res.status(201).json({
            success: true,
            error: '',
            data: createdProject,
        });
    } catch (error: any) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The project ${req.body.projectName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

/**
 * @api {put} /api/project/ Edits the project with the specified id
 */
router.put('/', async (req: Request, res: Response) => {
    const foundProject = (await project.findByPk(req.body.projectID)) as any;
    if (!foundProject) {
        return res.status(404).json({
            success: false,
            error: 'Project not found.',
        });
    }

    if (
        !req.body.projectName &&
        !req.body.projectDescription &&
        !req.body.projectSourceCodeURL &&
        !req.body.projectURL &&
        !req.body.languageIDs
    ) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
        });
    }

    try {
        const updatedProject = await foundProject.update({
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription,
            projectSourceCodeURL: req.body.projectSourceCodeURL,
            projectURL: req.body.projectURL,
        });

        await foundProject.setProgrammingLanguages(
            await programmingLanguage.findAll({
                where: {
                    programmingLanguageID: req.body.languageIDs,
                },
            }),
        );

        res.json({
            success: true,
            error: '',
            data: updatedProject,
        });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The project ${req.body.projectName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/project/ Delete a project
 */
router.delete('/', async (req: Request, res: Response) => {
    if (!req.body.projectID) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a projectID',
        });
    }

    try {
        // Delete project from database
        const deletedProject = await project.destroy({
            where: { projectID: req.body.projectID },
        });

        if (deletedProject === 0) {
            return res.status(404).json({
                success: false,
                error: 'Project not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Project deleted',
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;
