import { IGulpSettings } from "../definitions";

/**
 * Runs all web-related tasks.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[][] = [
        ["web:processHtml", "web:scss", "web:scssLint"],
        ["web:copy"],
    ];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
