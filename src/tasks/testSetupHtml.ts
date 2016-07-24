const fs = require("fs");
const mustache = require("gulp-mustache");
const rename = require("gulp-rename");
import { IGulpSettings, Constants } from "../main";

/**
 * Generates a <script> tag for a .js file.
 * 
 * @param src   Source of the file, excluding file extension.
 * @returns A <script> tag for the .js src.
 */
function generateScript(src: string): string {
    "use strict";

    return `<script type="text/javascript" src="${src}.js"></script>`;
}

/**
 * Sets up for tests.
 */
export function taskTestSetupHtml(settings: IGulpSettings, callback: Function) {
    "use strict";

    const mustacheSettings: any = {
        packageName: settings.packageName
    };

    if (settings.dependencies) {
        mustacheSettings.dependencies = settings.dependencies
            .map((dependency: string): string => {
                return generateScript(`../node_modules/${dependency}/lib/${dependency}`);
            })
            .concat(generateScript(`../lib/${settings.packageName}`))
            .join("\n        ");
    } else {
        mustacheSettings.dependencies = generateScript(`../lib/${settings.packageName}`);
    }

    mustacheSettings.tests = JSON.parse(fs.readFileSync(`${Constants.folders.test}/tsconfig.json`).toString())
        .files
        .filter((file: string): boolean => file.indexOf("utils/") !== 0)
        .map((test: string): string => {
            const testPath: string = test.replace(".ts", "");

            return [
                `<script type="text/javascript">mochaLoader.setTestPath("${testPath}");</script>`,
                generateScript(testPath)
            ].join("\n        ");
        })
        .join("\n        ");

    return settings.gulp.src("./node_modules/gulp-shenanigans/src/test/index.mustache")
        .pipe(mustache(mustacheSettings))
        .pipe(rename("index.html"))
        .pipe(settings.gulp.dest(`${Constants.folders.test}`));
}
