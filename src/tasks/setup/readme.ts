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

    console.log("--start--");
    console.log(readmeContents.substring(0, start));
    console.log("----");

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
                    ? "You can then open `src/index.html` to play."
                    : ""
            }),
        readmeContents.substring(end)
    ].join(os.EOL);
}

/**
 * Fills out standard details in README.md.
 */
export default function (settings: IGulpSettings): void {
    "use strict";

    const fs = require("fs");

    const location = Constants.files.readme;
    let readmeContents = fs.existsSync(location)
        ? fs.readFileSync(location).toString()
        : fs.readFileSync("./node_modules/gulp-shenanigans/src/setup/readme/README.md").toString();

    readmeContents = replaceBetween(readmeContents, "Builds", settings);
    readmeContents = replaceBetween(readmeContents, "Top", settings);

    fs.writeFileSync(location, readmeContents);
}
