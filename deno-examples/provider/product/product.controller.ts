import { ProductRepository } from "./product.repository.ts";
import type { Request, Response } from "../deps.ts";

export const repository = new ProductRepository();

export const getAll = async (_req: Request, res: Response) => {
  res.setStatus(200).json(await repository.fetchAll());
};

export const getById = async (req: Request, res: Response) => {
  let product;
  if (typeof req.params.id === "string") {
    product = await repository.getById(Number(req.params.id));
  } else {
    product = await repository.getById(req.params.id);
  }
  product
    ? res.setStatus(200).json(product)
    : res.setStatus(404).json({ message: "Product not found" });
};
