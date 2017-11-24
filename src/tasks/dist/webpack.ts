import { Constants, IEntry, IGulpSettings, IShenanigansSchema } from "../../definitions";

const getEntriesAndSources = (shenanigans: IShenanigansSchema): IEntry[] => {
    return shenanigans.entries === undefined
        ? [
            {
                entry: `./${Constants.folders.src}/${shenanigans.name}.js`,
                name: shenanigans.name,
                sources: [
                    `${Constants.folders.src}/**/*.js`,
                    `!${Constants.folders.src}/main.js`,
                ]
            }
        ]
        : shenanigans.entries;
};

const getExternals = (shenanigans: IShenanigansSchema): { [i: string]: string } => {
    const output: { [i: string]: string } = {};

    if (shenanigans.externals === undefined) {
        return output;
    }

    for (const external of shenanigans.externals) {
        output[external.name] = external.name;
    }

    return output;
};

/**
 * Compiles source files with Webpack into the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const merge = require("merge2");
    const rename = require("gulp-rename");
    const sourcemaps = require("gulp-sourcemaps");
    const uglify = require("gulp-uglify");
    const webpack = require("webpack-stream");

    const entriesAndSources: IEntry[] = getEntriesAndSources(settings.packageSchema.shenanigans);
    const externals = getExternals(settings.packageSchema.shenanigans);
    const streams = entriesAndSources.map(({ entry, name, sources }: IEntry): any =>
        settings.gulp
            .src(sources)
            .pipe(sourcemaps.init())
            .pipe(webpack({
                entry,
                externals,
                output: {
                    library: name,
                    libraryTarget: "amd"
                }
            }))
            .pipe(rename(`${name}.js`))
            .pipe(uglify())
            .pipe(sourcemaps.write("."))
            .pipe(settings.gulp.dest(Constants.folders.dist)));

    return merge(streams);
}
