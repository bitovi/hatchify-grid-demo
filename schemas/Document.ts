import {
  string,
  datetime,
  enumerate,
  PartialSchema,
  integer,
  boolean,
} from "@hatchifyjs/hatchify-core";

export const Document: PartialSchema = {
  name: "Document",
  attributes: {
    name: string(),
    dueDate: datetime(),
    importance: integer(),
    status: enumerate({ values: ["Pending", "Failed", "Completed"] }),
    complete: boolean(),
  },
};
