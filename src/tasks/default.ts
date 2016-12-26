import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function taskDefault(settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[][] = [
        ["src"], ["lib"], ["test"], ["docs"]
    ];

    if (settings.taskGroups) {
        tasks.push(
            ...Object.keys(settings.taskGroups)
                .map((key: string): [string] => [key]));
    }

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
