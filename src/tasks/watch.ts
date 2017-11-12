import { Constants, IGulpSettings } from "../definitions";

/**
 * Runs the corresponding build tasks whenever source files change.
 */
export default function (settings: IGulpSettings): void {
    "use strict";

    settings.gulp.watch(
        [
            `${Constants.folders.src}/**/*.ts`,
            `!${Constants.folders.src}/**/*.d.ts`
        ],
        ["src:tsc"] as any);

    settings.gulp.watch(
        `${Constants.folders.test}/**/*.ts`,
        ["test:setup", "test:tsc"] as any);
}
