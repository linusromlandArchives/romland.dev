//External Dependencies Import
import { Router } from 'express';
import programmingLanguageRoutes from './programmingLanguage.routes';
import projectRoutes from './project.routes';
import projectImage from './projectImage.routes';
import authRoutes from './auth.routes';

//Variable Declarations
const router = Router();

router.use('/programmingLanguage', programmingLanguageRoutes);
router.use('/project', projectRoutes);
router.use('/projectImage', projectImage);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        error: '',
        message: 'Welcome to the Romland.dev API!',
    });
});

router.all('*', async (_req, res) => {
    res.status(404).json({
        success: false,
        error: 'Invalid endpoint',
    });
});

export default router;
