import {
  string,
  datetime,
  enumerate,
  PartialSchema,
} from "@hatchifyjs/hatchify-core";

export const DocumentV1 = {
  name: "Document",
  attributes: {
    name: { type: "STRING", allowNull: true },
    date: { type: "DATE", allowNull: true },
    status: {
      type: "ENUM",
      values: ["Pending", "Failed", "Completed"],
    },
  },
};

export const Document: PartialSchema = {
  name: "Document",
  attributes: {
    name: string(),
    date: datetime(),
    status: enumerate({ values: ["Pending", "Failed", "Completed"] }),
  },
};
