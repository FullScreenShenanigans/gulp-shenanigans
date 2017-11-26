import { Constants, IExternal, IGulpSettings } from "../../definitions";

/**
 * Sets up for tests.
 */
export default function taskTestSetupHtml(settings: IGulpSettings): any {
    "use strict";

    const glob = require("glob");
    const mustache = require("gulp-mustache");

    const mustacheSettings: any = {
        package: settings.packageSchema,
    };

    if (settings.packageSchema.dependencies) {
        mustacheSettings.dependencies = Object.keys(settings.packageSchema.dependencies)
            .map((dependency: string): string => `"${dependency}"`)
            .join(",\n                ");
    } else {
        mustacheSettings.dependencies = "";
    }

    if (settings.packageSchema.shenanigans.externals) {
        mustacheSettings.externals = settings.packageSchema.shenanigans.externals
            .map((external: IExternal): string => {
                return `"${external.name}": "${external.js.dev}",`;
            })
            .join("\n                ");
    } else {
        mustacheSettings.externals = "";
    }

    mustacheSettings.tests = glob
        .sync(`${Constants.folders.test}/**/*.ts*`)
        .filter((file: string): boolean => {
            // Ignore auto-added utilities
            if (file.indexOf("utils/") === 0) {
                return false;
            }

            // Ignore the root main.js
            if (file.indexOf("/") === -1) {
                return false;
            }

            return true;
        })
        .map((test: string): string => {
            if (test.search(/^test/) === 0) {
                test = test.substring("test/".length);
            }

            if (test.search(/.ts$/) === test.length - ".ts".length) {
                test = test.substring(0, test.length - ".ts".length);
            }

            if (test.search(/.tsx$/) === test.length - ".tsx".length) {
                test = test.substring(0, test.length - ".tsx".length);
            }

            return `"${test}"`;
        })
        .join(",\n                ")
        .trim();

    return settings.gulp.src("./node_modules/gulp-shenanigans/src/test/index.html")
        .pipe(mustache(mustacheSettings))
        .pipe(settings.gulp.dest(Constants.folders.test));
}
