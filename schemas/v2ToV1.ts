import { PartialSchema, assembler } from "@hatchifyjs/hatchify-core";

export function v2ToV1(schemas: Record<string, PartialSchema>) {
  return Object.entries(assembler(schemas)).reduce(
    (schemaAcc, [schemaName, { relationships, ...schema }]) => ({
      ...schemaAcc,
      [schemaName]: {
        ...schema,
        attributes: Object.entries(schema.attributes).reduce(
          (acc, [key, { orm }]) => ({
            ...acc,
            [key]: {
              ...orm.sequelize,
              values:
                orm.sequelize.type === "ENUM" &&
                "typeArgs" in orm.sequelize &&
                orm.sequelize.typeArgs,
            },
          }),
          {}
        ),
        ...Object.entries(relationships ?? {}).reduce(
          (relationshipAcc, [relationshipName, relationship]) => {
            const type =
              relationship.type === "hasManyThrough"
                ? "belongsToMany"
                : relationship.type;
            return {
              ...relationshipAcc,
              [type]: [
                ...relationshipAcc[type],
                {
                  target: relationship.targetSchema,
                  options: {
                    as: relationshipName,
                    foreignKey:
                      ("sourceAttribute" in relationship &&
                        relationship.sourceAttribute) ||
                      ("targetAttribute" in relationship &&
                        relationship.targetAttribute),
                  },
                },
              ],
            };
          },
          {
            belongsTo: [],
            belongsToMany: [],
            hasMany: [],
            hasOne: [],
          }
        ),
      },
    }),
    {}
  );
}
