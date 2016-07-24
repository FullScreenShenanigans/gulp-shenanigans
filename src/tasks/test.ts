import { IGulpSettings } from "../main";

/**
 * Sets up, executes, then takes down tests.
 */
export function taskTest(settings: IGulpSettings, callback: Function) {
    "use strict";
    const runSequence = require("run-sequence").use(settings.gulp);

    runSequence(
        ["testSetupHtml", "testSetupUtilities"],
        ["testSetupScripts"],
        ["testRun"],
        ["testTakedown"],
        callback);
}
