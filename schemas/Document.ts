export const Document = {
  name: "Document",
  attributes: {
    name: {type: "STRING", allowNull: false },
    date: {type: "DATE", allowNull: true },
    status: {
      type: "ENUM",
      values: ["Pending", "Failed", "Completed"]
    }
  },
};
