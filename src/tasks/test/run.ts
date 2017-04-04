import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs mochaPhantomJs tests.
 */
export default function taskTestRun(settings: IGulpSettings): any {
    "use strict";

    const mochaPhantomJS = require("gulp-mocha-phantomjs");

    return settings.gulp.src(`${Constants.folders.test}/index.html`)
        .pipe(mochaPhantomJS({
            phantomjs: {
                useColors: true
            }
        }));
}
