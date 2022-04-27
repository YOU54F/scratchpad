import type { CarStatus } from "./cars.types.ts";

export class Car {
  id: number;
  name: string;
  manufacturer: string;
  make: string;
  model: string;
  year: number;
  registration: string;
  status: CarStatus;
  constructor(car: Car) {
    this.id = car.id;
    this.name = car.name;
    this.manufacturer = car.manufacturer;
    this.make = car.make;
    this.model = car.model;
    this.year = car.year;
    this.registration = car.registration;
    this.status = car.status;
  }
}
