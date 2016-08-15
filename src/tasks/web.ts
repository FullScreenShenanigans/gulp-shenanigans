import { IGulpSettings } from "../definitions";

/**
 * Runs all web-related tasks.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["web:processHtml", "web:scss", "web:scssLint"],
        ["web:copy", "web:cssMin"],
    ];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
