const tslint: any = require("gulp-tslint");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs TSLint on source files.
 */
export default function taskTslint(settings: IGulpSettings): any {
    "use strict";

    return settings.gulp
        .src([
            `${Constants.folders.src}/**/*.ts`,
            `!${Constants.folders.src}/**/*.d.ts`
        ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
}
