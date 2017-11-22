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
            experimentalDecorators: true,
            ignoreCompilerErrors: true,
            jsx: "react",
            module: "commonjs",
            name: settings.packageSchema.shenanigans.name,
            out: output,
            target: "es2015"
        }))
        .pipe(settings.gulp.dest(output));
}
