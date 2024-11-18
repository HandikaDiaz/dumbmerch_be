import { Router } from "express";
import authRouter from "./child/auth";
import cartRouter from "./child/cart";
import categoryRouter from "./child/category";
import paymentRouter from "./child/payment";
import productRouter from "./child/product";
import profileRouter from "./child/profile";
import messageRouter from "./child/message";

const routerV1 = Router();

routerV1.use('/auth', authRouter);
routerV1.use('/category', categoryRouter);
routerV1.use('/product', productRouter);
routerV1.use('/profile', profileRouter);
routerV1.use('/cart', cartRouter);
routerV1.use("/payment", paymentRouter);
routerV1.use("/message", messageRouter);

export default routerV1;