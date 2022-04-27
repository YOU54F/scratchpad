import { Car } from "./car.ts";
import { CarStatus, Makes, Manufacturers } from "./cars.types.ts";

export class CarsRepository {
  cars: Map<number, Car>;
  constructor() {
    this.cars = new Map([
      [
        1,
        new Car({
          id: 1,
          name: "yellow peril",
          manufacturer: Manufacturers.VW,
          make: Makes.Golf,
          model: "Coupe S",
          year: 1985,
          registration: "B745BGP",
          status: CarStatus.OWNED
        })
      ],
      [
        2,
        new Car({
          id: 2,
          name: "brian",
          manufacturer: Manufacturers.BMW,
          make: Makes.E21,
          model: "316i",
          year: 1981,
          registration: "OYF544Y",
          status: CarStatus.OWNED
        })
      ],
      [
        3,
        new Car({
          id: 3,
          name: "orangina",
          manufacturer: Manufacturers.VW,
          make: Makes.Golf,
          model: "LS",
          year: 1981,
          registration: "FMC29V",
          status: CarStatus.OWNED
        })
      ]
    ]);
  }

  fetchAll() {
    return [...this.cars.values()];
  }

  getById(id: number) {
    return this.cars.get(id);
  }
  addCar(car: Car) {
    return this.cars.set(car.id, car);
  }
  deleteById(id: number) {
    return this.cars.delete(id);
  }
  updateById(id: number, car: Car) {
    return this.cars.set(id, car);
  }
}
