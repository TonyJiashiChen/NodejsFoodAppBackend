import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateSalt, encryptPassword } from "../utility";


export const findVendor = async (id: string | undefined, email?: string ) => {
    if(email) {
        const vendor = await Vendor.findOne({email: email}) 
        return vendor;
    } else {
        return await Vendor.findById(id)
    }
}

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVendorInput>req.body;

    const existingVendor = await findVendor('', email)

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
    const vendors = await Vendor.find();

    if (vendors !== null) {
        return res.json(vendors)
    }
    return res.json({"message": "vendors} data not avaiable"})
}

export const GetVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const vendorId = req.params.id;
    const vendor = await findVendor(vendorId);

    if (vendor !== null) {
        return res.json(vendor);
    }

    return res.json({"message": "vendors} data not avaiable"})
}