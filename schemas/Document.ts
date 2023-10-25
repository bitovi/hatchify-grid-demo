import {
  string,
  dateonly,
  datetime,
  // enumerate,
  PartialSchema,
  integer,
  text,
  // boolean,
} from "@hatchifyjs/core";

export const Document = {
  name: "Document",
  attributes: {
    name: string(),
    dueDate: datetime(),
    importance: integer(),
    lastUpdatedDate: dateonly(),
    notes: text()
    // status: enumerate({ values: ["Pending", "Failed", "Completed"] }),
    // complete: boolean(),
  },
} satisfies PartialSchema;
