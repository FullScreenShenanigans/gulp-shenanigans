import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[] = ["lib:tsc"];

    if (settings.taskGroups && settings.taskGroups.web) {
        tasks.push("lib:copy", "lib:cssMin", "lib:html");
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
