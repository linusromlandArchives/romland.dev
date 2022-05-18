//External Dependencies import
import { Request, Response, NextFunction } from 'express';

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
    const password = req.body.password ? req.body.password : req.query.password;
    if (password == 'password') {
        next();
    } else {
        res.status(403).json({
            success: false,
            error: 'Access denied',
        });
    }
}
