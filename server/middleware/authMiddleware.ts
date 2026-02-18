import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";


interface AuthRequest extends Request {
    user?: {
        id: string;
        role?: string;
    };
}

const verifyUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1️⃣ Get authorization header safely
        const authHeader = req.headers.authorization;
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
            .status(401)
            .json({ success: false, error: "Token not provided" });
        }
    
        // 2️⃣ Extract token properly
        const token = authHeader.split(" ")[1];
    
        // 3️⃣ Check JWT secret
        const secret = process.env.JWT_KEY;
    
        if (!secret) {
            throw new Error("JWT_KEY is not defined");
        }
    
        // 4️⃣ Verify token
        const decoded = jwt.verify(token, secret) as JwtPayload & {
            _id: string;
            role?: string;
        };
    
        // 5️⃣ Find user
        const user = await User.findById(decoded._id).select('-password')
    
        if (!user) {
            return res
            .status(404)
            .json({ success: false, error: "User not found" });
        }
    
        // 6️⃣ Attach user to request
        req.user = {
            id: user._id.toString(),
            role: user.role,
        };
    
        next();
        }
    catch (error) {
        console.error(error);
    
        return res
            .status(500)
            .json({ success: false, error: "server error" });
    }
};

export default verifyUser;
