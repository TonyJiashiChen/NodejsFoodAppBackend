import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";


export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVendorInput>req.body;

    const createVendor = await Vendor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: password,
        salt: '',
        serviceAvailable: false,
        coverImages: [],
        rating: 0,
    })
    
    return res.json({ name, address, pincode, foodType, email, password, ownerName, phone });
}

export const GetVendor = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
}