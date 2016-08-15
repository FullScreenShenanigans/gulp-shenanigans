const merge: any = require("merge2");
const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Generates distribution .js files from the Typespace .ts output.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tsSource: any = `${Constants.folders.lib}/${settings.package.name}.ts`;
    const tsResult: any = settings.gulp.src(tsSource)
        .pipe(ts({
            declaration: true
        }));

    return merge([
        tsResult.dts.pipe(settings.gulp.dest(Constants.folders.lib)),
        tsResult.js.pipe(settings.gulp.dest(Constants.folders.lib))
    ]);
}
