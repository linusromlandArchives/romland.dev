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
        const { userID, username, createdAt, updatedAt } = req.user as any;
        res.status(200).json({
            success: true,
            error: '',
            user: { userID, username, createdAt, updatedAt },
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            user: null,
        });
    }
});

router.get('/logout', (req: Request, res: Response) => {
    try {
        req.logout();
        res.status(200).json({
            success: true,
            error: '',
            message: 'Logout Successful',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Logout Failed',
        });
    }
});

export default router;
