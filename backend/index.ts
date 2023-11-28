import fs from "fs";
import dotenv from "dotenv";
import { Command } from "commander";
import Express from "express";
import Koa from "koa";
import koaCors from "@koa/cors";
import cors from "cors";
import { hatchifyExpress } from "@hatchifyjs/express";
import { hatchifyKoa } from "@hatchifyjs/koa";
import schemas from "../schemas";

dotenv.config({ path: "../.postgres.env" });

const options = new Command()
  .requiredOption("-f, --framework <express|koa>", "Node framework")
  .requiredOption("-d, --database <sqlite|rds|postgres>", "Database type")
  .parse()
  .opts();

const hatchedNode = getHatchFunction(options.framework)(schemas, {
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

function getDatabaseConfiguration(database: "postgres" | "rds" | "sqlite") {
  if (database === "sqlite") {
    return { uri: "sqlite://localhost/:memory" };
  }

  const postgresDatabaseUri = `${
    database === "rds" ? "postgres" : database
  }://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PGHOST}:${
    process.env.PGPORT || 5432
  }/${process.env.PGDATABASE}`;

  if (database === "postgres") {
    return { uri: postgresDatabaseUri };
  }

  return {
    uri: `${postgresDatabaseUri}?ssl=true`,
    additionalOptions: {
      ssl: {
        rejectUnauthorized: false,
        ca: [fs.readFileSync(__dirname + "/../rds-combined-ca-bundle.pem")],
      },
    },
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
