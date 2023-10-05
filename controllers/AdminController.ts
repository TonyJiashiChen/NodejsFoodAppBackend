import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSalt, encryptPassword } from "../utility";


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVendorInput>req.body;

    const existingVendor = await Vendor.findOne({email: email})

    if(existingVendor !== null) {
        return res.json({"message": "a vendor existed with this email ID"})
    }

    //generate a salt
    const salt = await GenerateSalt();
    const encryptedPassword = await encryptPassword(password, salt);
    //encrypt password with salt

    const createVendor = await Vendor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: encryptedPassword, 
        salt: salt,
        serviceAvailable: false,
        coverImages: [],
        rating: 0,
    })
    
    return res.json(createVendor);
}

export const GetVendor = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
}