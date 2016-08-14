import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[][] = [
        ["lib:typespace"],
        ["lib:dist"],
    ];

    if (settings.taskGroups.web) {
        tasks[0].push("web:processHtml", "web:copy", "web:cssMin");
        tasks.push(["web:uglify"]);
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
