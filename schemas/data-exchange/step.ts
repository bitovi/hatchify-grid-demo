import uuid from "uuid";

export const Step = {
  name: "Step",
  namespace: "DataExchange",
  displayAttribute: "stepName",
  attributes: {
    stepId: {
      type: "UUID",
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
    itemId: "UUID",
    stepName: "TEXT",
    startDateTime: "DATE",
    endDateTime: "DATE",
    stepResult: "TEXT",
    exitStatus: "DECIMAL",
  },
  belongsTo: [
    {
      target: "Item",
      options: { as: "item", foreignKey: "itemId", constraints: false },
    },
  ],
};
