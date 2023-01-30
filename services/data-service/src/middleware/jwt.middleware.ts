import * as jwt from "jsonwebtoken";
import {NextFunction, Response} from "express";
import RequestWithUser from "../types/request";

// Verify JWT middleware
function verifyJwt(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        // Verify JWT using the secret stored on the server
        req.user = jwt.verify(token, process.env.JWT_SECRET as string) as Record<string, any>;
        return next();
    } catch (err) {
        return res.status(400).send("Invalid token");
    }
}

export default verifyJwt;
