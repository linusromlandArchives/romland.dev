//External Dependencies import
import { Request, Response, NextFunction } from 'express';

/**
 * @name checkAdmin
 * @description Middleware to check if user is authenticated
 * @param req - Request object from Express
 * @param res - Response object from Express
 * @param next - Next function
 * @returns {Promise<void>} - Returns a promise that resolves when the function is finished
 */
export function checkAdmin(req: Request, res: Response, next: NextFunction) {
    //Check if user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }

    //If user is not authenticated, return 401
    res.status(401).json({
        success: false,
        error: 'Access denied',
    });
}
