import { Router } from "../deps.ts";
import * as controller from "./product.controller.ts";
export const router = Router();

router.get("/product/:id", controller.getById);
router.get("/products", controller.getAll);
