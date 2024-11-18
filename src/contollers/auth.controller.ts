import { Response } from "express";
import { CustomRequest } from "../libs/request";
import * as authService from '../services/auth.service'

export async function checkAuth(req: CustomRequest, res: Response) {
    try {
        const user = req.user;
        res.json(user)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function register(req: CustomRequest, res: Response) {
    try {
        const body = req.body
        const user = await authService.register(body)
        res.json(user)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}

export async function login(req: CustomRequest, res: Response) {
    try {
        const body = req.body;
        const user = await authService.login(body);
        res.json(user)
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}