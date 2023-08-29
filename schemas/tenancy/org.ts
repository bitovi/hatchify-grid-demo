import uuid from "uuid";

export const Org = {
  name: "Org",
  namespace: "Tenancy",
  displayAttribute: "orgMnemonic",
  attributes: {
    orgId: { type: "UUID", primaryKey: true, defaultValue: () => uuid.v4() },
    orgMnemonic: "TEXT",
    orgType: "TEXT",
  },
  hasMany: [
    {
      target: "DataSource",
      options: { as: "dataSources", foreignKey: "orgId" },
    },
  ],
};
