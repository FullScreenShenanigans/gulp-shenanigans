const fs: any = require("fs");
const merge: any = require("merge2");
const path: any = require("path");
import { Constants, IExternal, IGulpSettings } from "../../definitions";

/**
 * Collects required typings files for a shenanigans project.
 * 
 * @param settings   Settings for a shenanigans project.
 * @returns Required typings file names, keyed to their location.
 */
function collectTypingsFiles(settings: IGulpSettings): { [i: string]: string } {
    "use strict";

    const files: { [i: string]: string } = {};

    for (const dependency of Object.keys(settings.dependencies)) {
        files[dependency] = `./node_modules/${dependency.toLowerCase()}/lib/${dependency}.d.ts`;
    }

    for (const i in settings.externals) {
        if (!settings.externals.hasOwnProperty(i)) {
            continue;
        }

        const external: IExternal = settings.externals[i];
        files[external.typing] = `./node_modules/@types/${external.typing}/index.d.ts`;
    }

    return files;
}

/**
 * Copies typings files into the typings directory.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const files: { [i: string]: string } = collectTypingsFiles(settings);
    const streams: any[] = [];

    for (const file of Object.keys(files)) {
        console.log("Reading from", files[file]);
        console.log(path.normalize(files[file]));
        console.log("Writing to", `${Constants.folders.typings}/${file}.d.ts`);
        console.log(path.normalize(`${Constants.folders.typings}/${file}.d.ts`));
        console.log("");
        streams.push(
            fs.createReadStream(files[file])
                .pipe(fs.createWriteStream(`${Constants.folders.typings}/${file}.d.ts`)));
    }

    return merge(streams);
}
