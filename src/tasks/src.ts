import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[] = ["src:tsc", "src:tslint"];

    if (settings.packageSchema.shenanigans.web) {
        tasks.push("src:scss", "src:scssLint");
    }

    require("run-sequence").use(settings.gulp)(tasks, callback);
}
