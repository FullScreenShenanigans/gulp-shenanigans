const mochaPhantomJS = require("gulp-mocha-phantomjs");
import { IGulpSettings, Constants } from "../../definitions";

/**
 * Runs mochaPhantomJs tests.
 */
export default function taskTestRun(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.test}/index.html`)
        .pipe(mochaPhantomJS({
            phantomjs: {
                useColors: true
            }
        }));
}
