//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { passport } from '../config/passport';

//Variable Declarations
const router = Router();

router.post(
    '/login',
    passport.authenticate('local'),
    (req: Request, res: Response) => {
        const user = req.user;
        req.login(user, (err: any) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: 'Username or password is incorrect',
                });
            }

            res.status(200).json({
                success: true,
                error: "",
                user: user,
        }); 
    });
}

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
