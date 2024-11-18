import { Router } from "express";
import * as profileController from "../../../contollers/profile.controller";
import { authentication } from "../../../middlewares/authentication";
import upload from "../../../middlewares/upload";

const profileRouter = Router();

profileRouter.get('/get', authentication, profileController.getProfile);
profileRouter.put('/update', authentication, upload.single('image'), profileController.updateProfie);

export default profileRouter;