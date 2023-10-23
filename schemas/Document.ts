import {
  string,
  dateonly,
  datetime,
  // enumerate,
  PartialSchema,
  integer,
  // boolean,
} from "@hatchifyjs/core";

export const Document = {
  name: "Document",
  attributes: {
    name: string(),
    dueDate: datetime(),
    importance: integer(),
    lastUpdatedDate: dateonly()
    // status: enumerate({ values: ["Pending", "Failed", "Completed"] }),
    // complete: boolean(),
  },
} satisfies PartialSchema;
