import uuid from "uuid";

export const Event = {
  name: "Event",
  namespace: "DataExchange",
  displayAttribute: "source",
  attributes: {
    eventId: {
      type: "UUID",
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
    source: "TEXT",
    type: "TEXT",
    status: "TEXT",
    eventDateTime: "DATE",
    completedDateTime: "DATE",
  },
  belongsTo: [
    {
      target: "DataSource",
      options: {
        as: "dataSource",
        foreignKey: "dataSourceId",
        constraints: false,
      },
    },
  ],
  hasMany: [
    {
      target: "Item",
      options: { as: "items", foreignKey: "itemId", constraints: false },
    },
  ],
};
