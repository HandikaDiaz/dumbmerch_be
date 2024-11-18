import { Router } from "express";
import * as paymentController from "../../../../src/contollers/payment.controller";
import { authentication } from "../../../middlewares/authentication";

const paymentRouter = Router();

paymentRouter.post('/trans/:cartId', authentication, paymentController.createPayment);

export default paymentRouter;