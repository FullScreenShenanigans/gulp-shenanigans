const mochaPhantomJS = require("gulp-mocha-phantomjs");
import { IGulpSettings, Constants } from "../main";

/**
 * Runs mochaPhantomJs tests.
 */
export function taskTestRun(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.test}/index.html`)
        .pipe(mochaPhantomJS({
            phantomjs: {
                useColors: true
            }
        }));
}
