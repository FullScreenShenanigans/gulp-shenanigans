const del: any = require("del");
import { Constants } from "../../definitions";

/**
 * Deletes all generated files.
 */
export default function (): any {
    "use strict";

    return del([
        `${Constants.folders.lib}/**/*`,
        `${Constants.folders.src}/**/*.js`,
        `${Constants.folders.typings}/**/*`
    ]);
}
