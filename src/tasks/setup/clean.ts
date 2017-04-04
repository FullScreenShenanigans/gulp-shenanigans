import { Constants } from "../../definitions";

/**
 * Deletes all generated files.
 */
export default function (): any {
    "use strict";

    const del = require("del");

    return del([
        `${Constants.folders.dist}/**/*`,
        `${Constants.folders.docs}/**/*`,
        `${Constants.folders.lib}/**/*`,
        `${Constants.folders.src}/**/*.js`,
        `${Constants.folders.src}/**/*.d.ts`,
        `${Constants.folders.test}/**/*.d.ts`,
        `${Constants.folders.test}/**/*.js`
    ]);
}
