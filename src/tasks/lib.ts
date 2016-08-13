import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[][] = [
        ["lib:typespace"],
        ["lib:dist"]
    ];

    if (settings.taskGroups.web) {
        tasks.push(["web:processHtml", "web:copy"]);
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
