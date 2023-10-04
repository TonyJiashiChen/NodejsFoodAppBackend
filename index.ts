import express from "express";
import {AdminRoute, VendorRoute} from './routes'
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute)
app.use('/vendor', VendorRoute)

app.listen(8000, () => {
    console.clear()
    console.log("app is listening on port 8000")
})