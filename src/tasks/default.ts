import { IGulpSettings } from "../main";

/**
 * One task to run them all.
 */
export function taskDefault(settings: IGulpSettings, callback: Function) {
    "use strict";

    const runSequence = require("run-sequence").use(settings.gulp);
    const tasks = [
        ["clean", "typespace", "tsc", "tslint"],
    ];

    tasks.push(["dist"], ["test"]);

    if (settings.web) {
        tasks[0].push("scss", "scssLint");
        tasks[1].push("processHtml", "webCopy");
    }

    runSequence(...tasks, callback);
}
