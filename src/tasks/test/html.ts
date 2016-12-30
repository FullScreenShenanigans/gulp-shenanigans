const glob: any = require("glob");
const mustache: any = require("gulp-mustache");

import { Constants, IExternal, IGulpSettings } from "../../definitions";

/**
 * Generates a <script> tag for a .js file.
 * 
 * @param src   Source of the file, excluding file extension.
 * @returns A <script> tag for the .js src.
 */
function generateScript(src: string): string {
    "use strict";

    return `<script src="${src}.js"></script>`;
}

/**
 * Sets up for tests.
 */
export default function taskTestSetupHtml(settings: IGulpSettings): any {
    "use strict";

    const mustacheSettings: any = {
        package: settings.package
    };

    if (settings.dependencies) {
        mustacheSettings.dependencies = Object.keys(settings.dependencies)
            .map((dependency: string): string => `"${dependency}"`)
            .join(",\n                ");
    } else {
        mustacheSettings.dependencies = "";
    }

    if (settings.externals) {
        mustacheSettings.externals = settings.externals
            .map((external: IExternal): string => {
                return generateScript(`../${external.file}`);
            })
            .join("\n        ");
    } else {
        mustacheSettings.externalScripts = "<!-- (none) -->";
    }

    mustacheSettings.tests = glob
        .sync(`${Constants.folders.test}/**/*.ts`)
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

            return `"${test}"`;
        })
        .join(",\n                ")
        .trim();

    return settings.gulp.src("./node_modules/gulp-shenanigans/src/test/index.html")
        .pipe(mustache(mustacheSettings))
        .pipe(settings.gulp.dest(Constants.folders.test));
}
