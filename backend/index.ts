// hatchify-app/backend/index.ts
import Koa from "koa";
import cors from "@koa/cors";
import { hatchifyKoa } from "@hatchifyjs/koa";
import { Document } from "../schemas/Document";

const fs = require('fs');
const rdsCa = fs.readFileSync(__dirname + '/../rds-combined-ca-bundle.pem');

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const port: number = Number(process.env.PGPORT); // Assuming PORT is the environment variable you're trying to assign

const app = new Koa();
/*const hatchedKoa = hatchifyKoa([Document], {
  prefix: "/api",
  database: {
    dialect: "sqlite",
    storage: "example.sqlite",
  },
});*/

const hatchedKoa = hatchifyKoa([Document], {
  prefix: "/api",
  database: {
    dialect: "postgres",
    dialectOptions: {
       ssl: {
         rejectUnauthorized: false,
         ca: [rdsCa]
       },
    },
    host: process.env.PGHOST,
    port: port,
    ssl: true,
    database: process.env.PGDATABASE,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  },
})

app.use(cors());
app.use(hatchedKoa.middleware.allModels.all);

(async () => {
  await hatchedKoa.createDatabase();

  app.listen(3000, () => {
    console.log("Started on port 3000");
  });
})();