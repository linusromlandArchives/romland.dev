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
    const visible = req.query.visible as string;
    const limit = req.query.limit as string;
    const featured = req.query.featured as string;

    const conditions = {} as any;

    if (ids) {
        conditions.projectID = { [Op.in]: ids.split(',') };
    }

    if (projectName) {
        conditions.projectName = { [Op.substring]: projectName };
    }

    if (visible) {
        conditions.projectVisible = visible == 'true' ? true : false;
    }

    if (featured) {
        conditions.projectFeatured = featured == 'true' ? true : false;
    }

    try {
        const projects = (await project.findAll({
            where: conditions,
            include: [projectImages, programmingLanguage],
            limit: limit ? parseInt(limit) : undefined,
        })) as any;

        const filteredProjects = languageIDs ? [] : projects;

        if (languageIDs) {
            const languageIDsArray = languageIDs.split(',');

            for (const project of projects) {
                const projectLanguages = project.programmingLanguages;

                for (const language of projectLanguages) {
                    if (languageIDsArray.includes(language.programmingLanguageID.toString())) {
                        filteredProjects.push(project);
                        break;
                    }
                }
            }
        }

        res.json({
            success: true,
            error: '',
            //Filter by language
            data: filteredProjects,
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
    if (!req.body.projectName || !req.body.projectDescription || !req.body.languageIDs) {
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
        !req.body.projectVisible &&
        !req.body.projectFeatured &&
        !req.body.languageIDs
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid projectName, projectDescription, projectSourceCodeURL, projectURL, projectVisible, projectFeatured or languageIDs',
        });
    }

    try {
        const updatedProject = await foundProject.update({
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription,
            projectSourceCodeURL: req.body.projectSourceCodeURL,
            projectURL: req.body.projectURL,
            projectVisible: req.body.projectVisible,
            projectFeatured: req.body.projectFeatured,
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
