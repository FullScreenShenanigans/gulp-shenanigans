import { IGulpSettings } from "../main";

/**
 * One task to run them all.
 */
export function taskDefault(settings: IGulpSettings, callback: Function) {
    "use strict";

    const runSequence = require("run-sequence").use(settings.gulp);

    runSequence(
        ["clean", "typespace", "tsc", "tslint"],
        ["test", "dist"],
        callback);
}
