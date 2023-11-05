import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { vendorPayload } from "../dto";
import { APP_SECRET } from "../config";
import { Request } from "express";
import { authPayload } from "../dto/Auth.dto";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const encryptPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}


export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await encryptPassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = (payload: vendorPayload) => {
    const signature = jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
    return signature;
}

export const validateSignature = async (req: Request) => {

    const signature = req.get('Authorization');

    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as authPayload;
        req.user = payload;
        return true;
    }
    
    return false;
}
