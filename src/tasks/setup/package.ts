const file: any = require("gulp-file");
const insert: any = require("gulp-insert");
const prettify: any = require("gulp-jsbeautifier");
const replace: any = require("gulp-replace");
import { IGulpSettings } from "../../definitions";

/**
 * Generates the project's package.json.
 */
export default function taskClean(settings: IGulpSettings): any {
    "use strict";

    let dependencies: any;
    const devDependencies: any = {
        "gulp": `${settings.shenanigans.dependencies.gulp}`,
        "gulp-shenanigans": `^${settings.shenanigans.version}`
    };

    if (settings.dependencies) {
        if (!dependencies) {
            dependencies = {};
        }

        for (const i of Object.keys(settings.dependencies)) {
            dependencies[i.toLowerCase()] = settings.dependencies[i];
        }
    }

    if (settings.node_modules) {
        if (settings.node_modules.dependencies) {
            if (!dependencies) {
                dependencies = {};
            }

            for (const i of Object.keys(settings.node_modules.dependencies)) {
                dependencies[i] = settings.node_modules.dependencies[i];
            }
        }

        if (settings.node_modules.devDependencies) {
            for (const i of Object.keys(settings.node_modules.devDependencies)) {
                devDependencies[i] = settings.node_modules.devDependencies[i];
            }
        }
    }

    const packageInfo: any = {
        name: settings.package.nodeName,
        description: settings.package.description,
        version: settings.package.version || "0.0.0",
        author: {
            name: "Josh Goldberg",
            email: "joshuakgoldberg@outlook.com"
        },
        repository: {
            type: "git",
            url: `ssh://git@github.com:FullScreenShenanigans/${settings.package.name}.git`
        },
        bugs: {
            url: `https://github.com/FullScreenShenanigans/${settings.package.name}/issues`
        },
        license: "MIT"
    };

    if (dependencies) {
        packageInfo.dependencies = dependencies;
    }

    packageInfo.devDependencies = devDependencies;

    return file("package.json", JSON.stringify(packageInfo), { src: true })
        .pipe(prettify({
            indent_level: 2,
            json: {
                indent_level: 2
            },
            js: {
                indent_level: 2
            }
        }))
        .pipe(replace("    ", "  "))
        .pipe(insert.append("\n"))
        .pipe(settings.gulp.dest("."));
}
