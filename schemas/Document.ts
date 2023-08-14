export const Document = {
  name: "Document",
  attributes: {
    name: {type: "STRING", allowNull: true },
    date: {type: "DATE", allowNull: true },
    status: {
      type: "ENUM",
      values: ["Pending", "Failed", "Completed"]
    }
  },
};
