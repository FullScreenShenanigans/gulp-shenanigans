import { IGulpSettings } from "../definitions";

/**
 * Generates compiled distribution webpages.
 */
export default function (settings: IGulpSettings, callback: Function): void {
    "use strict";

    const tasks: string[] = ["web:copy", "web:html", "web:main", "web:webpack"];

    require("run-sequence").use(settings.gulp)(...tasks, callback);
}
