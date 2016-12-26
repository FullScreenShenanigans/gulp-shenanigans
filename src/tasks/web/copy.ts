import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies resource files to the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        `${Constants.folders.lib}/**/*`,
        `!${Constants.folders.lib}/**/*.js`,
        `!${Constants.folders.lib}/**/*.js.map`,
        `!${Constants.folders.lib}/**/*.ts`,
    ];

    return settings.gulp
        .src(sources, {
            base: Constants.folders.lib
        })
        .pipe(settings.gulp.dest(Constants.folders.dist));
}
