const merge: any = require("merge2");
const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Generates distribution .js files from the Typespace .ts output.
 */
export default function (settings: IGulpSettings): void {
    "use strict";

    const project: any = ts.createProject("tsconfig.json");
    const source: any = `${Constants.folders.lib}/${settings.package.name}.ts`;
    const result: any = settings.gulp.src(source)
        .pipe(project());

    return merge([
        result.dts.pipe(settings.gulp.dest(Constants.folders.lib)),
        result.js.pipe(settings.gulp.dest(Constants.folders.lib))
    ]);
}
