import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import documents from "./documents";
import fields from "./fields";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([...documents, ...fields]),
});
