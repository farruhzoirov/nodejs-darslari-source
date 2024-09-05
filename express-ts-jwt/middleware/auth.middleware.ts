import {NextFunction, Request, Response} from 'express';

import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];
        console.log(token)
        if (!token) {
            return res.status(401).json({
                error: 'No token provided',
            })
        }

        const verifyToken =  jwt.verify(token as string, process.env.JWT_SECRET as string);

        if (!verifyToken) {
            return res.status(401).json({
                error: 'NO authorized',
            })
        }
        next()

    } catch (error) {

    }
}