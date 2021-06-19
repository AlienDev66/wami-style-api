import { Router } from "express";
import multer from "multer";
import UsersControllers from "./controllers/UsersControllers";
import uploadConfig from "./config/upload";
import ProductsControllers from "./controllers/ProductsControllers";
import LoginControllers from "./controllers/LoginControllers";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/product", upload.array("images"), ProductsControllers?.create);
routes.get("/products", ProductsControllers?.index);
routes.get("/product/:id", ProductsControllers?.show);
routes.delete("/product/:id", ProductsControllers?.delete);

routes.post("/login", LoginControllers.create);

routes.post("/user", UsersControllers.create);
routes.get("/users", UsersControllers.index);

export default routes;
