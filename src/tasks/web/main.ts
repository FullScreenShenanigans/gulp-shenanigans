import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies a main.js file to the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        `${Constants.folders.lib}/main.js`,
    ];

    return settings.gulp
        .src(sources, {
            base: Constants.folders.lib
        })
        .pipe(settings.gulp.dest(Constants.folders.dist));
}
