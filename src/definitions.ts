import * as gulp from "gulp";

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
export interface IProjectSchema {
    /**
     * Names and versions of FullScreenShenanigans project dependencies, if any.
     */
    dependencies?: {
        [i: string]: string;
    };

    /**
     * Information on external scripts to include, if any.
     */
    externals?: IExternal[];

    /**
     * Node module dependencies and devDependencies, if any.
     */
    node_modules?: {
        /**
         * Names and versions of general Node module dependencies, if any.
         */
        dependencies?: {
            [i: string]: string;
        };

        /**
         * Names and versions of general Node module devDependencies, if any.
         */
        devDependencies?: {
            [i: string]: string;
        };
    };

    /**
     * Metadata on the project.
     */
    package: {
        /**
         * Flavored description of the project.
         */
        description: string;

        /**
         * Case-sensitive repository name.
         */
        name: string;

        /**
         * Lowercase Node module name (by default, `name` lowercased).
         */
        nodeName: string;

        /**
         * Semver package version.
         */
        version: string;
    };

    /**
     * Directories of optional tasks to include.
     */
    taskGroups?: {
        /**
         * Whether to include the games task group.
         */
        games?: true;

        /**
         * Settings for the web task group.
         */
        web?: IWebTaskGroup;

        [i: string]: any | undefined;
    };
}

/**
 * Settings for the web task group.
 */
export interface IWebTaskGroup {
    /**
     * Public URL for the project site.
     */
    url: string;

    /**
     * Paragraphs of text below the game.
     */
    sections: {
        /**
         * Credits to owners and commuity contributors to the original game.
         */
        credits: string[];

        /**
         * Brief explanation of this project.
         */
        explanation: string[];

        /**
         * Legal disclosure about project ownership.
         */
        legal: string;
    };
}

/**
 * Project settings with runtime gulp settings added.
 */
export interface IGulpSettings extends IProjectSchema {
    /**
     * Names of any dependencies.
     */
    dependencyNames: string[];

    /**
     * Gulp runner for the shenanigans project.
     */
    gulp: gulp.Gulp;

    /**
     * Package settings for gulp-shenanigans.
     */
    shenanigans: any;
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

/* tslint:disable typedef */

/**
 * Constants used across tasks.
 */
export const Constants = {
    /**
     * Default task groups to run.
     */
    defaultTaskGroups: ["docs", "lib", "setup", "src", "test"],

    /**
     * Locations of package files.
     */
    files: {
        /**
         * Main package README.md.
         */
        readme: "README.md",

        /**
         * Files relevant to src.
         */
        src: {
            /**
             * src's tsconfig.json.
             */
            tsconfig: "tsconfig.json"
        },

        /**
         * Files relevant to test.
         */
        test: {
            /**
             * test's tsconfig.json.
             */
            tsconfig: "tsconfig.json"
        }
    },

    /**
     * Locations of package folders.
     */
    folders: {
        /**
         * Output destination for compiled distribution webpages.
         */
        dist: "dist",

        /**
         * Output destination for documentation.
         */
        docs: "docs",

        /**
         * Output destination for built code.
         */
        lib: "lib",

        /**
         * Folders of resources for web projects.
         */
        resources: [
            "sounds", "theme"
        ],

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

/* tslint:enable typedef */
