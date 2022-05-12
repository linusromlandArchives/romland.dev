//External Dependencies Import
import { Router } from 'express';
import programmingLanguageRoutes from './programmingLanguage.routes';
import projectRoutes from './project.routes';

//Variable Declarations
const router = Router();

router.use('/programmingLanguage', programmingLanguageRoutes);
router.use('/project', projectRoutes);

export default router;
