import { IGulpSettings } from "../definitions";

/**
 * One task to run them all.
 */
export default function taskDefault(settings: IGulpSettings, callback: Function) {
    "use strict";

    require("run-sequence").use(settings.gulp)(
        ["setup"], ["src"], ["lib"], ["test"], callback);
}
