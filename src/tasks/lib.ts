import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[][] = [
        ["lib:typespace"],
        ["lib:dist"],
        ["lib:uglify"]
    ];

    if (settings.taskGroups.web) {
        tasks[0].push("web:processHtml", "web:copy", "web:cssMin");
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
