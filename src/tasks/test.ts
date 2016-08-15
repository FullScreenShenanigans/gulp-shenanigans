import { IGulpSettings } from "../definitions";

/**
 * Sets up test scaffolding, then runs tests.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["test:setupHtml", "test:setupUtilities"],
        ["test:setupScripts"],
        ["test:run"]
    ];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
