const rename: any = require("gulp-rename");
const sourcemaps: any = require("gulp-sourcemaps");
const webpack: any = require("gulp-webpack");

import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source files with Webpack into the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        `${Constants.folders.lib}/**/*.js`,
        `!${Constants.folders.lib}/main.js`,
    ];

    return settings.gulp
        .src(sources)
        .pipe(sourcemaps.init())
        .pipe(webpack({
            // entry: `${Constants.folders.lib}/${settings.package.name}.js`,
            // entry: `${Constants.folders.lib}/main.ts`,
            output: {
                library: settings.package.name,
                libraryTarget: "var"
            }
        }))
        .pipe(rename(`${settings.package.name}.js`))
        .pipe(sourcemaps.write("."))
        .pipe(settings.gulp.dest(Constants.folders.dist));
}
