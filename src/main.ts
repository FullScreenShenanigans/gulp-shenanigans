/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";

import { taskClean } from "./tasks/clean";
import { taskDefault } from "./tasks/default";
import { taskDist } from "./tasks/dist";
import { taskScss } from "./tasks/scss";
import { taskScssLint } from "./tasks/scssLint";
import { taskTest } from "./tasks/test";
import { taskTestRun } from "./tasks/testRun";
import { taskTestSetupHtml } from "./tasks/testSetupHtml";
import { taskTestSetupScripts } from "./tasks/testSetupScripts";
import { taskTestSetupUtilities } from "./tasks/testSetupUtilities";
import { taskTestTakedown } from "./tasks/testTakedown";
import { taskTslint } from "./tasks/tslint";
import { taskTsc } from "./tasks/tsc";
import { taskTypespace } from "./tasks/typespace";
import { taskWatch } from "./tasks/watch";
import { taskWebCopy } from "./tasks/webCopy";

/**
 * Description of an external script dependency.
 */
export interface IExternal {
    /**
     * The dependency's .js script file location.
     */
    file: string;

    /**
     * The dependency's .d.ts definition file location.
     */
    typing: string;
}

/**
 * Settings for a shenanigans project.
 */
export interface IGulpSettings {
    /**
     * Names of FullScreenShenanigans project dependencies, if any.
     */
    dependencies?: string[];

    /**
     * Information on external scripts to include, if any.
     */
    externals?: IExternal[];

    /**
     * Gulp runner for the shenanigans project.
     */
    gulp: any;

    /**
     * Name of the shenanigans project.
     */
    packageName: string;

    /**
     * Whether this project should include web compliation tasks.
     */
    web?: boolean;
}

/**
 * Constants used across tasks.
 */
export const Constants = {
    /**
     * Locations of package folders.
     */
    folders: {
        /**
         * Output destination for built code.
         */
        lib: "lib",

        /**
         * Location of all source code.
         */
        src: "src",

        /**
         * Location of all test code.
         */
        test: "test"
    }
};

/**
 * Imported function to run as a Gulp task.
 * 
 * @param settings   Settings for a shenanigans project.
 * @param callback   Node-style callback, if a stream isn't returned.
 * @returns Either a stream or void (to indicate the callback will be used).
 */
interface ITask {
    (settings: IGulpSettings, callback: Function): any;
}

/**
 * Tasks, keyed by name.
 */
interface ITasks {
    [i: string]: ITask;
}


/**
 * Default gulp tasks that can be run.
 */
const tasks: ITasks = {
    clean: taskClean,
    default: taskDefault,
    dist: taskDist,
    test: taskTest,
    testRun: taskTestRun,
    testSetupHtml: taskTestSetupHtml,
    testSetupScripts: taskTestSetupScripts,
    testSetupUtilities: taskTestSetupUtilities,
    testTakedown: taskTestTakedown,
    tslint: taskTslint,
    tsc: taskTsc,
    typespace: taskTypespace,
    watch: taskWatch
};

/**
 * Web-focused gulp tasks that can be run.
 */
const webTasks: ITasks = {
    scss: taskScss,
    scssLint: taskScssLint,
    webCopy: taskWebCopy
};

/**
 * Adds a set of tasks to gulp.
 * 
 * @param settings   Settings for a shenanigans project.
 * @param tasks   Tasks to be added, keyed by name.
 */
function addTasks(settings: IGulpSettings, tasks: ITasks): void {
    "use strict";

    for (const taskName of Object.keys(tasks)) {
        settings.gulp.task(
            taskName,
            (callback: Function): any => tasks[taskName](settings, callback));
    }
}

/**
 * Creates gulp tasks for gulp-shenanigans.
 * 
 * @param settings   Settings for a shenanigans project.
 */
export function initialize(settings: IGulpSettings): void {
    "use strict";

    addTasks(settings, tasks);

    if (settings.web) {
        addTasks(settings, webTasks);
    }
};
