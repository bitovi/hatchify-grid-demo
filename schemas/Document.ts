export const Document = {
  name: "Document",
  attributes: {
    name: "STRING",
    date: {type: "DATE", allowNull: false },
    status: {
      type: "ENUM",
      values: ["Pending", "Failed", "Completed"]
    }
  },
};
