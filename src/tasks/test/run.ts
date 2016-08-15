const mochaPhantomJS: any = require("gulp-mocha-phantomjs");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs mochaPhantomJs tests.
 */
export default function taskTestRun(settings: IGulpSettings): any {
    "use strict";

    return settings.gulp.src(`${Constants.folders.test}/index.html`)
        .pipe(mochaPhantomJS({
            phantomjs: {
                useColors: true
            }
        }));
}
