import { Request, Response, Router } from "express";
import * as authContoller from "../../../contollers/auth.controller";
import { authentication } from "../../../middlewares/authentication";

const authRouter = Router();

authRouter.get('/check', authentication, authContoller.checkAuth);
authRouter.post('/register', authContoller.register);
authRouter.post('/login', authContoller.login);
authRouter.post("/logout", (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
    return 
});

// authRouter.post('/forgot-password', authContoller.forgotPassword);
// authRouter.get('/reset-password/:token', authContoller.resetPassword);
// authRouter.post('/reset-password/:token', authContoller.resetPassword);


export default authRouter;