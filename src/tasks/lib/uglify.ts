const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
import { IExternal, IGulpSettings, Constants } from "../../definitions";

/**
 * Collects names of required .js files from project settings.
 * 
 * @param settings   Settings for a shenanigans project.
 * @returns   Names of required .js files for the project.
 */
function collectScriptFiles(settings: IGulpSettings): string[] {
    "use strict";

    const files: string[] = [];

    if (settings.dependencies) {
        files.push(
            ...settings.dependencies.map(
                (dependency: string): string => {
                    return `node_modules/${dependency.toLowerCase()}/lib/${dependency}.js`;
                }));
    }

    if (settings.externals) {
        files.push(
            ...settings.externals.map(
                (external: IExternal): string => {
                    return `${external.file}.js`;
                }));
    }

    files.push(`lib/${settings.packageName}.js`);

    return files;
}

/**
 * Converts node-style .ts source files into a namespace-style .ts file.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    return settings.gulp
        .src(collectScriptFiles(settings))
        .pipe(uglify())
        .pipe(concat(`${settings.packageName}.min.js`))
        .pipe(settings.gulp.dest(`${Constants.folders.lib}`));
}
