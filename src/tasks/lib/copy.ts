import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies resource files to the lib folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = Constants.folders.resources
        .map((folder: string): string => {
            return `${Constants.folders.src}/${folder}/**/*`;
        });

    return settings.gulp
        .src(sources, {
            base: Constants.folders.src
        })
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
