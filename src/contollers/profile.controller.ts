import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as profileService from '../services/profile.service'
import uploader from "../libs/cloudinary";

export async function getProfile(req: CustomRequest, res: Response) {
    try {
        const user = req.user.id;
        const profile = await profileService.findProfileByUserId(user);
        res.json(profile);
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function updateProfie(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = req.user.id;
        if(req.file) {
            body.image = await uploader(req.file as Express.Multer.File);
        }
        console.log("body", body);
        
        await profileService.updateProfie(body, user);
        res.json({ message: "Profile updated" });
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}