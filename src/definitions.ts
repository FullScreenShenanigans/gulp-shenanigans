import * as gulp from "gulp";

export interface IPackageSchema {
    /**
     * Package dependencies to run in production.
     */
    dependencies?: { [i: string]: string };

    /**
     * Lowercase name of the project.
     */
    name: string;

    /**
     * Shenanigans-specific settings for the project.
     */
    shenanigans: IShenanigansSchema;
}

/**
 * Settings for a shenanigans project.
 */
export interface IShenanigansSchema {
    /**
     * Any external script dependencies.
     */
    externals?: IExternal[];

    /**
     * PascalCase name of the project.
     */
    name: string;

    /**
     * Whether to include the games task group.
     */
    games?: true;

    /**
     * Settings for the web task group, if included.
     */
    web?: IWebTaskGroup;
}

/**
 * Description of an external dependency.
 */
export interface IExternal {
    /**
     * Scripts the dependency needs to bring in.
     */
    js: IExternalScripts;

    /**
     * Package name of the dependency.
     */
    name: string;
}

/**
 * Scripts a dependency needs to brig in.
 */
export interface IExternalScripts {
    /**
     * Development version of the script.
     */
    dev: string;

    /**
     * Production version of the script.
     */
    prod: string;
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
         * Credits to owners and community contributors to the original game.
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
export interface IGulpSettings {
    /**
     * Any package dependencies.
     */
    dependencies: string[];

    /**
     * Gulp runner for the shenanigans project.
     */
    gulp: gulp.Gulp;

    /**
     * Package settings for the shenanigans project.
     */
    packageSchema: IPackageSchema;
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
            tsconfig: "test/tsconfig.json"
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
         * Output destination for generated documentation within docs.
         */
        docsGenerated: "generated",

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
