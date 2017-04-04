import { Constants, IGulpSettings } from "../../definitions";

/**
 * Creates documentation files using TypeDoc.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const typedoc = require("gulp-typedoc");

    return settings.gulp
        .src([`${Constants.folders.src}/**/*.ts`])
        .pipe(typedoc({
            ignoreCompilerErrors: true,
            module: "commonjs",
            name: settings.package.name,
            out: "./docs",
            target: "es5"
        }))
        .pipe(settings.gulp.dest("."));
}
