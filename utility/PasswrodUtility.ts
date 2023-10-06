import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { vendorPayload } from "../dto";
import { APP_SECRET } from "../config";

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const encryptPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await encryptPassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = async (payload: vendorPayload) => {
    const signature = jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
    return signature;
}
