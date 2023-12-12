import fs from "fs";
import Express from "express";
import Koa from "koa";
import c2k from "koa-connect";
// @ts-expect-error @todo make TS happy
import { createServer as createViteServer } from "vite";
import { hatchifyExpress } from "@hatchifyjs/express";
import { hatchifyKoa } from "@hatchifyjs/koa";

export function getHatchFunction(framework: "express" | "koa") {
  if (framework === "express") return hatchifyExpress;
  return hatchifyKoa;
}

export function getDatabaseConfiguration(
  database: "postgres" | "rds" | "sqlite",
) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setupExpress(middleware: any) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setupKoa(middleware: any) {
  const app = new Koa();

  const vite = await createViteServer({
    root: `${__dirname}/../`,
    server: { middlewareMode: true },
  });

  app.use(middleware);

  app.use(c2k(vite.middlewares));

  return app;
}
