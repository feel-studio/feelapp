import T from "@sanity/base/initial-value-template-builder";
import { singletons as documentSchemas } from "../schemas/documents";

const i18nTemplates = documentSchemas
  .map(({ name }) => name)
  .map((docType) => {
    return T.template({
      id: `i18n_${docType}`,
      title: `${docType} (i18n)`,
      schemaType: docType,
      value: (params) => ({
        i18n: { locale: params.code },
      }),
    });
  });

export default [...T.defaults(), ...i18nTemplates];
