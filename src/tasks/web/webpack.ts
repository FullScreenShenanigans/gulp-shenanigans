const rename: any = require("gulp-rename");
const sourcemaps: any = require("gulp-sourcemaps");
const uglify: any = require("gulp-uglify");
const webpack: any = require("webpack-stream");

import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source files with Webpack into the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        `${Constants.folders.src}/**/*.js`,
        `!${Constants.folders.src}/main.js`,
    ];

    return settings.gulp
        .src(sources)
        .pipe(sourcemaps.init())
        .pipe(webpack({
            entry: `./${Constants.folders.src}/${settings.package.name}.js`,
            output: {
                library: settings.package.name,
                libraryTarget: "amd"
            }
        }))
        .pipe(rename(`${settings.package.name}.js`))
        .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(settings.gulp.dest(Constants.folders.dist));
}
