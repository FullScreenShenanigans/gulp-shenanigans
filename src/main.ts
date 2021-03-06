"use strict";

import * as fs from "fs";
import * as path from "path";

import { Constants, IGulpSettings, IPackageSchema, IShenanigansSchema, ITask } from "./definitions";

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

        const shenanigans: IShenanigansSchema = this.settings.packageSchema.shenanigans;

        if (shenanigans.games) {
            this.addTasksInGroup("games");
        }

        if (shenanigans.web) {
            this.addTasksInGroup("web");
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

    const packageSchema: IPackageSchema = JSON.parse(fs.readFileSync("./package.json").toString());
    const dependencies = packageSchema.dependencies === undefined
        ? []
        : Object.keys(packageSchema.dependencies);
    const gulpSettings: IGulpSettings = { dependencies, gulp, packageSchema };

    new GulpShenanigans(gulpSettings).initializeTasks();
}
