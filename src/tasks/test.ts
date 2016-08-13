import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tasks: string[][] = [
        ["test:setupHtml", "test:setupScripts", "test:setupUtilities"],
        ["test:run"],
        ["test:takedown"]
    ];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
