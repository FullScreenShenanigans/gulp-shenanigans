import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function taskDefault(settings: IGulpSettings, callback: Function): void {
    "use strict";

    require("run-sequence").use(settings.gulp)(
        ["src"], ["lib"], ["test"], ["docs"], callback);
}
