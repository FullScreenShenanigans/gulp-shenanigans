import { IGulpSettings } from "../../definitions";

/**
 * Takes down after tests.
 */
export default function taskTestTakedown(settings: IGulpSettings, callback: Function) {
    "use strict";

    callback();
}
