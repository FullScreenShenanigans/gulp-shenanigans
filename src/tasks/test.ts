const mochaPhantomJS = require("gulp-mocha-phantomjs");
import { IGulpSettings, Constants } from "../main";

/**
 * Runs mochaPhantomJs tests.
 */
export function taskTest(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.test}/unit/index.html`)
        .pipe(mochaPhantomJS());
}
