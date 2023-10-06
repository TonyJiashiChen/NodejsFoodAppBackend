import express, { Request, Response, NextFunction } from 'express';
import {VendorLogin} from '../controllers';

const router = express.Router();

router.post('/login', VendorLogin);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "from vendor"})
})


export {router as VendorRoute};