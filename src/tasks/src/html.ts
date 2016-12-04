import { Constants, IGulpSettings } from "../../definitions";
const rename: any = require("gulp-rename");
const mustache: any = require("gulp-mustache");

/**
 * Process HTML file templates in src/.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const mustacheSettings: any = {};

    if (settings.dependencies) {
        mustacheSettings.dependencies = Object.keys(settings.dependencies)
            .map((dependency: string): string => `"${dependency}"`)
            .join(",\n            ");
    } else {
        mustacheSettings.dependencies = "";
    }

    console.log("Outputting to", Constants.folders.src);

    return settings.gulp
        .src(`${Constants.folders.src}/*.html`)
        .pipe(rename((path: any): void => {
            path.basename = path.basename.replace(".template", "");
        }))
        .pipe(mustache(mustacheSettings))
        .pipe(settings.gulp.dest(Constants.folders.src));
}
