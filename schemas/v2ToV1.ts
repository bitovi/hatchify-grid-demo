import { PartialSchema } from "@hatchifyjs/hatchify-core";

export function v2ToV1(schema: PartialSchema) {
  return {
    name: schema.name,
    attributes: Object.entries(schema.attributes).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          type: value.orm.sequelize.type,
          allowNull: value.orm.sequelize.allowNull,
          values:
            value.orm.sequelize.type === "ENUM" &&
            "typeArgs" in value.orm.sequelize &&
            value.orm.sequelize.typeArgs,
        },
      }),
      {}
    ),
  };
}
