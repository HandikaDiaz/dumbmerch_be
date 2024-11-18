import { Router } from "express";
import * as categoryController from "../../../contollers/category.controller";
import { authentication } from "../../../middlewares/authentication";

const categoryRouter = Router();

categoryRouter.get('/get-all', categoryController.getAllCategories);
categoryRouter.get('/get/:categoryId', categoryController.getCategories);
categoryRouter.post('/create', authentication, categoryController.createCategory);// middleware nanti pake authorize
categoryRouter.put('/edit/:id', authentication, categoryController.editCategory);// middleware nanti pake authorize
categoryRouter.delete('/delete/:id', authentication, categoryController.deleteCategory);// middleware nanti pake authorize


export default categoryRouter;