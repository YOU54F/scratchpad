import { CarsRepository } from "./cars.repository.ts";
import type { Request, Response } from "../deps_server.ts";

export const repository = new CarsRepository();

const getAll = async (req: Request, res: Response) => {
  let result;

  try {
    result = await repository.fetchAll();
  } catch (err) {
    console.log("Error fetching all from repository");
    console.error(err);
  }

  return result
    ? res.setStatus(200).json({ success: true, data: result })
    : res
        .setStatus(500)
        .json({ success: false, msg: "Error fetching all from repository" });
};
const getById = async (req: Request, res: Response) => {
  let result;

  if (typeof req.params.id === "string") {
    result = await repository.getById(Number(req.params.id));
  } else {
    result = await repository.getById(req.params.id);
  }

  return result
    ? res.setStatus(200).json({ success: true, data: result })
    : res.setStatus(404).json({ success: false, msg: "Not found" });
};
const deleteById = async (req: Request, res: Response) => {
  let fetchResult;

  if (typeof req.params.id === "string") {
    fetchResult = await repository.getById(Number(req.params.id));
  } else {
    fetchResult = await repository.getById(req.params.id);
  }

  if (!fetchResult) {
    return res
      .setStatus(404)
      .json({ success: false, msg: "Error deleting by id" });
  }

  let deleteResult;

  if (typeof req.params.id === "string") {
    deleteResult = await repository.deleteById(Number(req.params.id));
  } else {
    deleteResult = await repository.deleteById(req.params.id);
  }
  return deleteResult
    ? res.setStatus(200).json({ success: true })
    : res.setStatus(400).json({ success: false, msg: "Error deleting by id" });
};
const updateById = async (req: Request, res: Response) => {
  if (!req.body || !req.params.id) {
    return res.setStatus(400).json({ success: false, msg: "no data provided" });
  }
  const id = Number(req.params.id);
  let fetchResult = await repository.getById(id);

  if (!fetchResult) {
    return res
      .setStatus(404)
      .json({ success: false, msg: "Error updating by id" });
  }

  const car = req.body;
  const updateResult = await repository.updateById(id, car);
  fetchResult = await repository.getById(id);

  return updateResult
    ? res.setStatus(200).json({ success: true, data: fetchResult })
    : res.setStatus(400).json({ success: false, msg: "Error updating by id" });
};
const addCar = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.setStatus(400).json({ success: false, msg: "no data provided" });
  }
  const car = req.body;
  const existingResult = await repository.getById(car.id);
  if (existingResult) {
    res
      .setStatus(400)
      .json({ success: false, msg: "Cannot overwrite existing product" });
  }
  const addResult = await repository.addCar(car);
  const fetchResult = await repository.getById(car.id);

  return addResult
    ? res.setStatus(200).json({ success: true, data: fetchResult })
    : res
        .setStatus(400)
        .json({ success: false, msg: "Error creating new car" });
};

export const controller = { getAll, getById, deleteById, updateById, addCar };
