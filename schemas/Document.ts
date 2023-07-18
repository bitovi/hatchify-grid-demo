export const Document = {
  name: "Document",
  attributes: {
    name: "STRING",
    date: "DATE",
    status: {
      type: "ENUM",
      values: ["Pending", "Failed", "Completed"]
    }
  },
};
