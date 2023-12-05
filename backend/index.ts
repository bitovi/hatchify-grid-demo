import fs from "fs";
import dotenv from "dotenv";
import { Command } from "commander";
import Express from "express";
import Koa from "koa";
import c2k from "koa-connect";
import { createServer as createViteServer } from "vite";
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

  (await setupApp(hatchedNode.middleware.allModels.all)).listen(3000, () => {
    console.log("Started on port 3000");
  });
})();

function getHatchFunction(framework: "express" | "koa") {
  if (framework === "express") return hatchifyExpress;
  return hatchifyKoa;
}

function getDatabaseConfiguration(database: "postgres" | "rds" | "sqlite") {
  return database === "rds"
    ? {
        uri: `${process.env.DB_URI}?ssl=true`,
        additionalOptions: {
          ssl: {
            rejectUnauthorized: false,
            ca: [fs.readFileSync(__dirname + "/../rds-combined-ca-bundle.pem")],
          },
        },
      }
    : { uri: process.env.DB_URI };
}

async function setupApp(middleware: any) {
  if (options.framework === "express") return setupExpress(middleware);
  return setupKoa(middleware);
}

async function setupExpress(middleware: any) {
  const app = Express();

  const vite = await createViteServer({
    root: `${__dirname}/../`,
    server: { middlewareMode: true },
  });

  app.use((req, res, next) => {
    if (req.url.startsWith("/api")) {
      next();
    } else {
      vite.middlewares.handle(req, res, next);
    }
  });

  app.use(middleware);
  return app;
}

async function setupKoa(middleware: any) {
  const app = new Koa();

  const vite = await createViteServer({
    root: `${__dirname}/../`,
    server: { middlewareMode: true },
  });

  app.use(middleware);

  app.use(c2k(vite.middlewares));

  return app;
}
