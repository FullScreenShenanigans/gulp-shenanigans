const typespace = require("gulp-typespace");
import { IGulpSettings, Constants } from "../main";

/**
 * Converts node-style .ts source files into a namespace-style .ts file.
 */
export function taskTypespace(settings: IGulpSettings) {
    "use strict";

    const typeSettings = {
        config: "./tsconfig.json",
        outFile: `${settings.packageName}.ts`,
        namespace: settings.packageName,
        pathPrefix: Constants.folders.src,
        root: "."
    };

    return typespace(typeSettings)
        // todo: append the if module and exports stuff
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
