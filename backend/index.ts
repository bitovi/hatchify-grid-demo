// hatchify-app/backend/index.ts
import Koa from "koa";
import cors from "@koa/cors";
import { hatchifyKoa } from "@hatchifyjs/koa";
import { Document } from "../schemas/Document";
import dotenv from "../.env";
dotenv.config();

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
    host: process.env.POSTGRES_CLUSTER_ENDPOINT,
    port: +process.env.POSTGRES_CLUSTER_PORT,
    username: process.env.POSTGRES_CLUSTER_MASTER_USERNAME,
    password: process.env.POSTGRES_CLUSTER_MASTER_PASSWORD,
  },
})


/*
| `POSTGRES_CLUSTER_ENDPOINT` (and `PGHOST`) | Writer endpoint for the cluster |
| `POSTGRES_CLUSTER_PORT` (and `PGPORT`) | The database port |
| `POSTGRES_CLUSTER_MASTER_PASSWORD` (and `PG_PASSWORD`) | database root password |
| `POSTGRES_CLUSTER_MASTER_USERNAME` (and `PG_USER`) | The database master username |
| `POSTGRES_CLUSTER_DATABASE_NAME` (and `PGDATABASE`) | Name for an automatically created database on cluster creation |
*/


app.use(cors());
app.use(hatchedKoa.middleware.allModels.all);

(async () => {
  await hatchedKoa.createDatabase();

  app.listen(3000, () => {
    console.log("Started on port 3000");
  });
})();
