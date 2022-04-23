//External Dependencies Import
import { Router } from 'express';
import programmingLanguageRoutes from './programmingLanguage.routes';

//Variable Declarations
const router = Router();

router.use('/programmingLanguage', programmingLanguageRoutes);

export default router;
