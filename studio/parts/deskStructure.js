import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import resolveProductionUrl from "../parts/resolveProductionUrl";
import { listCollections, listSingleton } from "../utils/structure";
import { renderEmoji } from "../utils";

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (["documentProject"].includes(schemaType)) {
    return S.document().views([S.view.form(), previewPanel]);
  }
};

const previewPanel = S.view
  .component(Iframe)
  .options({
    url: (doc) => resolveProductionUrl(doc),
  })
  .title("Preview");

const items = [
  ...listSingleton(S, ["documentInfo", "documentLegal"], [previewPanel]),
  S.divider(),
  orderableDocumentListDeskItem({
    type: "documentProject",
    title: "Projects",
    icon: renderEmoji("📁"),
    id: "project",
  }),
  S.divider(),
  ...listSingleton(S, ["documentSettings"]),
];

export default () => S.list().title("Content").items(items);
