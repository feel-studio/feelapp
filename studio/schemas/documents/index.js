import documentLegal from "./legal";
import documentSettings from "./settings";

import documentCollection from "./collection";

export const singletons = [documentSettings, documentLegal];

export const collections = [documentCollection];

export default [...singletons, ...collections];
