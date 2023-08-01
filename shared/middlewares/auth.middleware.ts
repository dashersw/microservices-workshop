import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenSecret = "accessTokenSecret";

export interface CustomRequest extends Request {
    payload: string | JwtPayload | undefined;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, accessTokenSecret, (err, user) => {
                if (err) {
                    return res.sendStatus(401).send('Authentication failed');
                }
                // Add token to header 
                (req as CustomRequest).payload = user;
                next();
            })
        }
        else {
            res.sendStatus(401).send('Authentication required');
        }

    }
    catch {
        res.status(401).send("Authentication failed!")
    }
}

export const createAuthToken = (userId: string): string => {
    const accessToken = jwt.sign({ userId }, accessTokenSecret);
    return accessToken;
}
