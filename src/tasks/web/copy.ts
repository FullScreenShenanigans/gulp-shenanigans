import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies resource files to the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        ...Constants.folders.resources
            .map((resource: string): string => `${Constants.folders.lib}/${resource}/**`),
        `${Constants.folders.lib}/*.css`,
        `${Constants.folders.lib}/main.js`
    ];

    return settings.gulp
        .src(sources, {
            base: Constants.folders.lib
        })
        .pipe(settings.gulp.dest(Constants.folders.dist));
}
