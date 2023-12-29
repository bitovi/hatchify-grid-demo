# Hatchify Grid Demo

https://hatchify-grid-demo.bitovi-sandbox.com:3000 - React Koa SQLite
https://hatchify-grid-demo.bitovi-sandbox.com:3001 - React Koa Postgres

The demo is redeployed on every push to master. To deploy a version with the latest changes:

1. Create a new branch
2. Update the dependencies in `package.json`

```
@hatchifyjs/core
@hatchifyjs/express
@hatchifyjs/koa
@hatchifyjs/react
```

3. The demo will be deployed once the branch is merged into `main`
