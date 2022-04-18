//External Dependencies Import
import { Request, Response, Router } from 'express';

//Variable Declarations
const router = Router();

/**
 * @get/route: /api/
 * @desc: This route is used to test the api
 * @access: Public
 * @return: JSON
 */
router.get('/', async (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the api',
        error: '',
        status: 'success',
    });
});

export default router;
