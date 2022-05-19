//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { passport } from '../config/passport';

//Variable Declarations
const router = Router();

router.post('/login', (req: Request, res: Response) => {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message,
            });
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                error: info.message,
            });
        }
        req.login(user, (err: Error) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }
            return res.status(200).json({
                success: true,
                error: '',
                message: 'Login Successful',
            });
        });
    })(req, res);
});

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
