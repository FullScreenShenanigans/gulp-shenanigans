import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs TSLint on source files.
 */
export default function taskTslint(settings: IGulpSettings): any {
    "use strict";

    const gulpTslint = require("gulp-tslint");
    const tslint = require("tslint");

    const program = tslint.Linter.createProgram(Constants.files.src.tsconfig);

    return settings.gulp
        .src(
            [
                `${Constants.folders.src}/**/*.ts`,
                `!${Constants.folders.src}/**/*.d.ts`
            ],
            {
                base: "."
            })
        .pipe(gulpTslint({
            formatter: "verbose",
            program
        }))
        .pipe(gulpTslint.report());
}
