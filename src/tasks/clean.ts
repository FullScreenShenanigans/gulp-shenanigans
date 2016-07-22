import { Constants } from "../main";
const del = require("del");

/**
 * Deletes all built files.
 */
export function taskClean() {
    "use strict";

    return del([
        `${Constants.folders.lib}/**/*`,
        `${Constants.folders.src}/**/*.js`
    ]);
}
