import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";

import resolveProductionUrl from "../parts/resolveProductionUrl";
import { listCollections, listSingleton } from "../utils/structure";

const previewPanel = S.view
  .component(Iframe)
  .options({
    url: (doc) => resolveProductionUrl(doc),
  })
  .title("Preview");

const items = [
  ...listSingleton(S, ["documentLegal"], [previewPanel]),
  S.divider(),
  ...listCollections(S, ["documentCollection"], [previewPanel]),
  S.divider(),
  ...listSingleton(S, ["documentSettings"]),
];

export default () => S.list().title("Content").items(items);
