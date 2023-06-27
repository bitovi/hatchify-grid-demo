// hatchify-app/schemas/Todo.ts
export const User = {
  name: "User",
  attributes: {
    name: "STRING",
  },
  hasMany: [{ target: "Todo", options: { as: "todos" } }], // 👀
};