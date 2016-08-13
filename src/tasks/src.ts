import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[] = ["src:clean", "src:tsc", "src:tslint"];

    if (settings.taskGroups.web) {
        tasks.push("web:scss", "web:scssLint");
    }

    require("run-sequence").use(settings.gulp)(tasks, callback);
}
