import { IGulpSettings } from "../main";

/**
 * Takes down after tests.
 */
export function taskTestTakedown(settings: IGulpSettings, callback: Function) {
    "use strict";

    callback();
}
