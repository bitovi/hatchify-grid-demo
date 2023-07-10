//import fs from "fs";
import { Options } from "sequelize";
//import dotenv from "dotenv";
import { Command } from "commander";
import Express from "express";
import Koa from "koa";
import koaCors from "@koa/cors";
import cors from "cors";
import { hatchifyExpress } from "@hatchifyjs/express";
import { hatchifyKoa } from "@hatchifyjs/koa";
import { Document } from "../schemas/Document";

//dotenv.config({ path: "../.env" });

const options = new Command()
  .requiredOption("-f, --framework <express|koa>", "Node framework")
  .requiredOption("-d, --database <sqlite|postgres>", "Database type")
  .parse()
  .opts();

const hatchedNode = getHatchFunction(options.framework)([Document], {
  prefix: "/api",
  database: getDatabaseConfiguration(options.database),
});

(async () => {
  await hatchedNode.createDatabase();

  setupApp(hatchedNode.middleware.allModels.all).listen(3000, () => {
    console.log("Started on port 3000");
  });
})();

function getHatchFunction(framework: "express" | "koa") {
  if (framework === "express") return hatchifyExpress;
  return hatchifyKoa;
}

function getDatabaseConfiguration(database: "postgres" | "sqlite"): Options {
  if (database === "postgres")
    return {
          dialect: "postgres",
          host: "evergreen.dl.lan",
          port: 5432,
          username: "postgres",
          password: "postgres"
    };
 /*   Only for Aurora RDS  
    return {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
          ca: [fs.readFileSync(__dirname + "/../rds-combined-ca-bundle.pem")],
        },
      },
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      ssl: true,
      database: process.env.PGDATABASE,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    };
*/
  return {
    dialect: "sqlite",
    storage: "example.sqlite",
  };
}

function setupApp(middleware: any) {
  if (options.framework === "express") return setupExpress(middleware);
  return setupKoa(middleware);
}

function setupExpress(middleware: any) {
  const app = Express();
  app.use(cors());
  app.use(middleware);
  return app;
}

function setupKoa(middleware: any) {
  const app = new Koa();
  app.use(koaCors());
  app.use(middleware);
  return app;
}
