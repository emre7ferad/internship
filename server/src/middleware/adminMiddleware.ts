import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireAdmin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
    }

    next();
}