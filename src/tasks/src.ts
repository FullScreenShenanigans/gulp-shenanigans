import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[] = ["src:tsc", "src:tslint"];

    if (settings.taskGroups && settings.taskGroups.web) {
        tasks.push("web:scss", "web:scssLint");
    }

    require("run-sequence").use(settings.gulp)(tasks, callback);
}
