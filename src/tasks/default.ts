import { IGulpSettings, IShenanigansSchema } from "../definitions";

/**
 * One task to run them all.
 */
export default function taskDefault(settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["src"], ["lib"], ["test"], ["docs"]
    ];

    const shenanigans: IShenanigansSchema = settings.packageSchema.shenanigans;

    if (shenanigans.games) {
        tasks.push(["games"]);
    }

    if (shenanigans.web) {
        tasks.push(["web"]);
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
