//External Dependencies Import
import { Request, Response, Router } from 'express';
import { Op } from 'sequelize';

//Local Dependencies Import
import { project, projectImages, programmingLanguage } from '../models';
import { checkAdmin } from '../auth';

//Variable Declarations
const router = Router();

/**
 * @api {get} /api/project/ Returns all projects
 */
router.get('/', async (req: Request, res: Response) => {
    const ids = req.query.ids as string;
    const languageIDs = req.query.languageIDs as string;
    const projectName = req.query.projectName as string;

    const conditions = {} as any;
    const associationsConditions = [];

    if (ids) {
        conditions.projectID = { [Op.in]: ids.split(',') };
    }

    if (projectName) {
        conditions.projectName = { [Op.substring]: projectName };
    }

    if (languageIDs) {
        associationsConditions.push({
            model: programmingLanguage,
            where: {
                programmingLanguageID: languageIDs,
            },
        });
    }

    try {
        const projects = await project.findAll({
            where: conditions,
            include: [projectImages, programmingLanguage, ...associationsConditions],
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
router.post('/', checkAdmin, async (req: Request, res: Response) => {
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
            error: error.message,
        });
    }
});

/**
 * @api {put} /api/project/ Edits the project with the specified id
 */
router.put('/', checkAdmin, async (req: Request, res: Response) => {
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
            error: 'Please provide a valid projectName, projectDescription, projectSourceCodeURL, projectURL or languageIDs',
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
router.delete('/', checkAdmin, async (req: Request, res: Response) => {
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
                error: '',
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
