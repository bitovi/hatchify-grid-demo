import uuid from "uuid";

export const DataSource = {
  name: "DataSource",
  namespace: "Tenancy",
  displayAttribute: "dataSourceMnemonic",
  attributes: {
    dataSourceId: {
      type: "UUID",
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
    orgId: "UUID",
    dataSourceMnemonic: "TEXT",
  },
  belongsTo: [
    {
      target: "Org",
      options: { as: "org", foreignKey: "orgId", constraints: false },
    },
  ],
  hasMany: [
    {
      target: "Event",
      options: { as: "events", foreignKey: "dataSourceId", constraints: false },
    },
  ],
};
