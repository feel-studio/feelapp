import { uuid } from "@sanity/uuid";
import { renderEmoji } from "./helpers";
import config from "../sanity.json";
const { locales } = config.project;

export const listSingleton = (S, docTypes, preview = []) =>
  docTypes.map((docType) =>
    S.documentTypeListItem(docType).child((docType) =>
      !locales || locales?.length < 2
        ? S.document()
            .schemaType(docType)
            .views([S.view.form(), ...preview])
        : S.list()
            .title("Locales")
            .id("locale")
            .items(
              locales.map(({ title, code, emoji }) =>
                S.listItem()
                  .id(code)
                  .title(title)
                  .icon(renderEmoji(emoji))
                  .child(
                    S.documentWithInitialValueTemplate(`i18n_${docType}`, {
                      code,
                    })
                      .schemaType(docType)
                      .id([docType, code].join("-"))
                      .views([S.view.form(), ...preview])
                  )
              )
            )
    )
  );

export const listCollections = (S, docTypes, preview = []) =>
  docTypes.map((docType) =>
    !locales || locales?.length < 2
      ? S.documentTypeListItem(docType).child((docType) =>
          S.documentTypeList(docType).child(
            S.document()
              .schemaType(docType)
              .views([S.view.form(), ...preview])
          )
        )
      : S.documentTypeListItem(docType)
          .title(docType.replace("document", ""))
          .id(docType)
          .child(() =>
            S.list()
              .title("Locales")
              .id("locale")
              .items([
                ...locales.map(({ title, code, emoji }) =>
                  S.documentTypeListItem(docType)
                    .id(code)
                    .title(title)
                    .icon(renderEmoji(emoji))
                    .child(
                      S.documentTypeList(docType)
                        .id("id")
                        .title(`${docType.replace("document", "")} (${title})`)
                        .filter(
                          `_type == "${docType}" && i18n.locale == "${code}"`
                        )
                        .canHandleIntent(() =>
                          S.documentTypeList(docType).getCanHandleIntent()
                        )
                        .child(
                          S.document()
                            .schemaType(docType)
                            .views([S.view.form(), ...preview])
                        )
                    )
                ),
                S.divider(),
                S.documentTypeListItem(docType)
                  .title("Undefined")
                  .icon(renderEmoji("❔"))
                  .child(
                    S.documentTypeList(docType)
                      .id("id")
                      .filter(`_type == "${docType}" && !defined(i18n.locale)`)
                      .child(
                        S.document()
                          .schemaType(docType)
                          .views([S.view.form(), ...preview])
                      )
                  ),
              ])
          )
  );
