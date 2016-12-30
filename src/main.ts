"use strict";

import * as fs from "fs";
import * as path from "path";

import { Constants, IGulpSettings, ITask } from "./definitions";

class GulpShenanigans {
    /**
     * Settings for the shenanigans project.
     */
    private settings: IGulpSettings;

    /**
     * Initializes a new instance of the GulpShenanigans class.
     * 
     * @param settings   Settings for a shenanigans project.
     */
    public constructor(settings: IGulpSettings) {
        this.settings = settings;
    }

    /**
     * Loads tasks from the file system and registers them in Gulp.
     */
    public initializeTasks(): void {
        this.addTasksInGroup();

        for (const group of Constants.defaultTaskGroups) {
            this.addTasksInGroup(group);
        }

        if (this.settings.taskGroups) {
            for (const group in this.settings.taskGroups) {
                if (this.settings.taskGroups[group]) {
                    this.addTasksInGroup(group);
                }
            }
        }
    }

    /**
     * Loads tasks from a directory.
     * 
     * @param group   The name of the directory, as the task's parent group (if any).
     */
    private addTasksInGroup(group: string = ""): void {
        const directoryPath: string = path.join(__dirname, Constants.tasks.root, group);
        const children: string[] = fs.readdirSync(directoryPath)
            .filter((child: string): boolean => child.indexOf(".js") !== -1)
            .map((child: string): string => child.replace(".js", ""));

        for (const child of children) {
            const task: ITask = require(path.join(directoryPath, child)).default;

            this.settings.gulp.task(
                this.generateTaskName(group, child),
                (callback: Function): any => task(this.settings, callback));
        }
    }

    /**
     * Generates a tasks's name from its components.
     * 
     * @param group   The task's parent group (if any).
     * @param child   The task's child group (if any).
     */
    private generateTaskName(group: string, child?: string): string {
        return [group, child]
            .filter((component: string): boolean => !!component)
            .join(":");
    }
}

/**
 * Creates gulp tasks for gulp-shenanigans.
 * 
 * @param gulp   Settings for a shenanigans project.
 */
export function initialize(gulp: any): void {
    "use strict";

    const settings: IGulpSettings = JSON.parse(fs.readFileSync("./shenanigans.json").toString());
    const readmePath: string = "src/docs/README.md";

    settings.gulp = gulp;
    settings.readmeDetails = fs.existsSync(readmePath) ? fs.readFileSync(readmePath).toString() : undefined;
    settings.shenanigans = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`).toString());

    if (!settings.node_modules) {
        settings.node_modules = {};
    }

    if (!settings.package.nodeName) {
        settings.package.nodeName = settings.package.name.toLowerCase();
    }

    if (!settings.taskGroups) {
        settings.taskGroups = {};
    }

    settings.dependencyNames = Object.keys(settings.dependencies || {});

    new GulpShenanigans(settings).initializeTasks();
};

// For CLI usage
if (process.argv.indexOf("--init") !== -1) {
    fs.createReadStream(`${__dirname}/../src/setup/gulpfile.js`)
        .pipe(fs.createWriteStream("./gulpfile.js"));
    console.log("Created gulpfile.js");
}
