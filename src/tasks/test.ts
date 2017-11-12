import { IGulpSettings } from "../definitions";

/**
 * Sets up test scaffolding, then runs tests.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["test:html", "test:utilities"],
        ["test:tsc"],
        ["test:run"]
    ];

    if (settings.packageSchema.shenanigans.games !== undefined) {
        tasks.push(["test:games"]);
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
