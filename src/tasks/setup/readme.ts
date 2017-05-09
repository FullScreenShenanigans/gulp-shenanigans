import * as mustache from "mustache";
import { Constants, IGulpSettings } from "../../definitions";

function replaceBetween(readmeContents: string, section: string, settings: IGulpSettings): string {
    const fs = require("fs");
    const os = require("os");

    const starter = `<!-- {{${section}}} -->`;
    const ender = `<!-- {{/${section}}} -->`;

    const start = readmeContents.indexOf(starter) + starter.length;
    const end = readmeContents.indexOf(ender);
    const addingWeb: boolean = !!(settings.taskGroups && settings.taskGroups.web);

    return [
        readmeContents.substring(0, start),
        mustache.render(
            fs.readFileSync(`./node_modules/gulp-shenanigans/src/setup/readme/${section}.md`).toString().trim(),
            {
                ...settings,
                buildCommands: addingWeb
                    ? ["gulp setup", "gulp"]
                    : ["gulp"],
                extra: addingWeb
                    ? "After setting up and building locally, you open `src/index.html` to launch."
                    : ""
            }),
        readmeContents.substring(end)
    ].join(os.EOL);
}

/**
 * Fills out standard details in README.md.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const fs = require("fs");

    const location = Constants.files.readme;
    let readmeContents = fs.existsSync(location)
        ? fs.readFileSync(location).toString()
        : fs.readFileSync("./node_modules/gulp-shenanigans/src/setup/readme/README.md").toString();

    readmeContents = replaceBetween(readmeContents, "Top", settings);
    readmeContents = replaceBetween(readmeContents, "Development", settings);

    fs.writeFileSync(location, readmeContents);

    callback();
}
