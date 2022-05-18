//External Dependencies import
import { Request, Response, NextFunction } from 'express';

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        success: false,
        error: 'Access denied',
    });
}
