import uuid from "uuid";

export const Item = {
  name: "Item",
  namespace: "DataExchange",
  displayAttribute: "inputName",
  attributes: {
    itemId: {
      type: "UUID",
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
    eventId: "UUID",
    type: "TEXT",
    inputLocation: "TEXT",
    inputName: "TEXT",
    archiveBucket: "TEXT",
    archiveKey: "TEXT",
  },
  belongsTo: [
    {
      target: "Event",
      options: { as: "event", foreignKey: "eventId", constraints: false },
    },
  ],
  hasMany: [
    {
      target: "Step",
      options: { as: "steps", foreignKey: "itemId", constraints: false },
    },
  ],
};
