import { IGulpSettings } from "../definitions";

/**
 * Copies root configuration files.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["setup:clean"],
        [
            "setup:copy",
            "setup:package"
        ]
    ];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
