import path from "path";
import { DataSource } from "typeorm";
import { __prod__ } from "./constants";
import { Link } from "./entities/Link";

// if .env file does not contain all variables located inside .env.example => server will crash
import "dotenv-safe/config";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: __prod__ ? false : true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Link, User],
});
