import express, { Request, Response, NextFunction } from 'express';
import {VendorLogin, getVendorProfile, updateVendorProfile, updateVendorService} from '../controllers';
import { authenticate } from '../middlewares';

const router = express.Router();

router.post('/login', VendorLogin);

router.use(authenticate)
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "from vendor"})
})


export {router as VendorRoute};