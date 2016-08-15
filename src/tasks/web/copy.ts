import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies .css files to the destination folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const folders: string[] = Constants.folders.resources
        .map((folder: string): string => {
            return `${Constants.folders.src}/${folder}/**/*`;
        });

    return settings.gulp
        .src(folders, {
            base: Constants.folders.src
        })
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
