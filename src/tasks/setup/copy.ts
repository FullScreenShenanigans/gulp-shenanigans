const del = require("del");
import { Constants } from "../../definitions";

/**
 * Deletes all built files.
 */
export default function taskClean() {
    "use strict";

    return del([
        `${Constants.folders.lib}/**/*`,
        `${Constants.folders.src}/**/*.js`
    ]);
}
