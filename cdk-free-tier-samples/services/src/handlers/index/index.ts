import { useMiddyNonHttp } from "../../middleware";
import { getSeedDatabaseHandler } from "../database/seedDatabase";

export const seedDatabase = useMiddyNonHttp(getSeedDatabaseHandler());
