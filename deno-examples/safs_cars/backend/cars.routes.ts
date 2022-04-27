import { Router } from "../deps_server.ts";
import { controller } from "./cars.controller.ts";
export const router = Router();

router
  .get("/cars/:id", controller.getById)
  .get("/cars", controller.getAll)
  .put("/cars/:id", controller.updateById)
  .post("/cars", controller.addCar)
  .delete("/cars/:id", controller.deleteById);

export default router;
