import {Request, Response, NextFunction} from 'express'
import { VendorLoginInput } from '../dto';
import { findVendor } from './AdminController';
import { generateSignature, validatePassword } from '../utility';

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VendorLoginInput>req.body;
    const existingVendor = await findVendor('', email);

    if (existingVendor !== null) {
        //validation    
        const validation = await validatePassword(password, existingVendor.password, existingVendor.salt);
        if (validation) {

            const signature = generateSignature({
                _id: existingVendor.id,
                email: existingVendor.email,
                foodTypes: existingVendor.foodType,
                name: existingVendor.name
            })

            return res.json(signature);
        } else {
            return res.json({"message": "Password is not valid"});
        }
    }

    return res.json({"message": "Login credential is not valid"});
}


export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

}
export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {

}

