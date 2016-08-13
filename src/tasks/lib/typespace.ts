const typespace = require("gulp-typespace");
import { IExternal, IGulpSettings, Constants } from "../../definitions";

/**
 * Collects names of required typings files from project settings.
 * 
 * @param settings   Settings for a shenanigans project.
 * @returns   Names of required typings files for the project.
 */
function collectTypings(settings: IGulpSettings): string[] {
    "use strict";

    const typings: string[] = [];

    if (settings.dependencies) {
        typings.push(
            ...settings.dependencies.map(
                (dependency: string): string => `../typings/${dependency}.d.ts`));
    }

    if (settings.externals) {
        typings.push(
            ...settings.externals.map(
                (external: IExternal): string => `../typings/${external.typing}.d.ts`));
    }

    return typings;
}

/**
 * Converts node-style .ts source files into a namespace-style .ts file.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    const typeSettings = {
        config: "./tsconfig.json",
        outFile: `${settings.packageName}.ts`,
        namespace: settings.packageName,
        pathPrefix: Constants.folders.src,
        references: collectTypings(settings),
        root: ".",
        target: "commonjs"
    };

    return typespace(typeSettings)
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
