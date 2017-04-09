import { Constants, IGulpSettings } from "../../definitions";
import { projectFactory } from "../../projectFactory";

/**
 * Compiles test .ts files to .js in-place.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const project: any = projectFactory(Constants.files.src.tsconfig);
    const output: any = settings.gulp.src(Constants.folders.test + "/**/*.ts")
        .pipe(project());

    return output.js
        .pipe(settings.gulp.dest(Constants.folders.test));
}
