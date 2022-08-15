import S from "@sanity/base/structure-builder";
import { collections } from "../schemas/documents";

const templatesCollection = S.defaultInitialValueTemplateItems().filter(
  ({ spec }) => collections.map(({ name }) => name).includes(spec?.id)
);

export default [
  //   ...S.defaultInitialValueTemplateItems(),
  ...templatesCollection,
];
