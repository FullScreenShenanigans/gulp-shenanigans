/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";

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
     * Directories of tasks to include.
     */
    taskGroups: {
        lib: boolean;
        src: boolean;
        test: boolean;
        web: boolean;
        [i:string]: boolean;
    };
}

/**
 * Imported function to run as a Gulp task.
 * 
 * @param settings   Settings for a shenanigans project.
 * @param callback   Node-style callback, if a stream isn't returned.
 * @returns Either a stream or void (to indicate the callback will be used).
 */
export interface ITask {
    (settings: IGulpSettings, callback: Function): any;
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
    },

    /**
     * Locations of task information.
     */
    tasks: {
        /**
         * Root folder containing the tasks.
         */
        root: "tasks"
    }
};
