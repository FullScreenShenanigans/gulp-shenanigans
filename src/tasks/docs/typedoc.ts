import { Constants, IGulpSettings } from "../../definitions";

/**
 * Creates documentation files using TypeDoc.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const typedoc = require("gulp-typedoc");

    const output = `${Constants.folders.docs}/generated`;

    return settings.gulp
        .src([`${Constants.folders.src}/**/*.ts`])
        .pipe(typedoc({
            ignoreCompilerErrors: true,
            module: "commonjs",
            name: settings.package.name,
            out: output,
            target: "es5"
        }))
        .pipe(settings.gulp.dest(output));
}
