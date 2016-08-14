const merge = require("merge2");
const ts = require("gulp-typescript");
import { IGulpSettings, Constants } from "../../definitions";

/**
 * Generates distribution .js files from the Typespace .ts output.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tsSource = `${Constants.folders.lib}/${settings.packageName}.ts`;
    const tsResult = settings.gulp.src(tsSource)
        .pipe(ts({
            declaration: true
        }));

    return merge([
        tsResult.dts.pipe(settings.gulp.dest(Constants.folders.lib)),
        tsResult.js.pipe(settings.gulp.dest(Constants.folders.lib))
    ]);
}
