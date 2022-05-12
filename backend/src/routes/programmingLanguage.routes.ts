//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { programmingLanguage } from '../models/models';

//Variable Declarations
const router = Router();

/**
 * @api {get} /api/language/ Returns all languages
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const languages = await programmingLanguage.findAll();
        res.json({
            success: true,
            error: '',
            data: languages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
});

/**
 * @api {post} /api/language/ Create a new language
 */
router.post('/', async (req: Request, res: Response) => {
    if (
        (!req.body.programmingLanguageName && req.body.programmingLanguageName.length < 1) ||
        !req.body.programmingLanguageIcon ||
        !req.body.programmingLanguageURL
    ) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid programmingLanguageName, programmingLanguageIcon and programmingLanguageURL.',
        });
    }

    try {
        const language = await programmingLanguage.create({
            programmingLanguageName: req.body.programmingLanguageName,
            programmingLanguageIcon: req.body.programmingLanguageIcon,
            programmingLanguageURL: req.body.programmingLanguageURL,
        });
        res.status(201).json({
            success: true,
            error: '',
            data: language,
        });
    } catch (error: any) {
        //If error is same name, return error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The language ${req.body.languageName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

/**
 * @api {put} /api/language/ Edits the language with the specified id
 */
router.put('/', async (req: Request, res: Response) => {
    const language = await programmingLanguage.findByPk(req.body.programmingLanguageID);
    if (!language) {
        return res.status(404).json({
            success: false,
            error: 'Language not found.',
        });
    }

    if (!req.body.programmingLanguageName && !req.body.programmingLanguageIcon && !req.body.programmingLanguageURL) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a valid programmingLanguageName, programmingLanguageIcon or programmingLanguageURL.',
        });
    }

    try {
        const updatedLanguage = await language.update({
            programmingLanguageName: req.body.programmingLanguageName,
            programmingLanguageIcon: req.body.programmingLanguageIcon,
            programmingLanguageURL: req.body.programmingLanguageURL,
        });
        res.json({
            success: true,
            error: '',
            data: updatedLanguage,
        });
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                error: `The language ${req.body.languageName} already exists.`,
            });
        }

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

/**
 * @api {delete} /api/language/ Delete a language
 */
router.delete('/', async (req: Request, res: Response) => {
    if (!req.body.programmingLanguageID) {
        return res.status(400).json({
            success: false,
            error: 'Please provide a programmingLanguageID',
        });
    }

    try {
        // Delete country from database
        const language = await programmingLanguage.destroy({
            where: { programmingLanguageID: req.body.programmingLanguageID },
        });

        if (language === 0) {
            return res.status(404).json({
                success: false,
                error: 'Language not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                error: 'Language deleted',
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
