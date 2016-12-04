import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[] = ["lib:dist"];

    if (settings.taskGroups && settings.taskGroups.web) {
        tasks.push("web:libHtml", "web:copy", "web:cssMin");
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
