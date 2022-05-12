//External Dependencies Import
import { Router } from 'express';
import programmingLanguageRoutes from './programmingLanguage.routes';
import projectRoutes from './project.routes';
import projectImage from './projectImage.routes';

//Variable Declarations
const router = Router();

router.use('/programmingLanguage', programmingLanguageRoutes);
router.use('/project', projectRoutes);
router.use('/projectImage', projectImage);

export default router;
