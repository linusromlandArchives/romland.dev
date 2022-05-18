//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { passport } from '../config/passport';

//Variable Declarations
const router = Router();

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/api/auth',
        failureRedirect: '/api/tjos',
        failureFlash: true,
    }),
);

router.get('/', async (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(200).json({
            success: false,
            user: null,
        });
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.logout();
    res.redirect('/');
});

export default router;
