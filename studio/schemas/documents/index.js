import documentInfo from "./info";
import documentLegal from "./legal";
import documentSettings from "./settings";

import documentProject from "./project";

export const singletons = [documentSettings, documentInfo, documentLegal];

export const collections = [documentProject];

export default [...singletons, ...collections];
