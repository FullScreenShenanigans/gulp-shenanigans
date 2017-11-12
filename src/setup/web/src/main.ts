import { {{packageSchema.shenanigans.name}} } from "./{{packageSchema.shenanigans.name}}";

const {{packageSchema.shenanigans.web.drivingObject}}: {{packageSchema.shenanigans.name}} = new {{packageSchema.shenanigans.name}}();

document.getElementById("game")!.appendChild({{packageSchema.shenanigans.web.drivingObject}}.container);

(window as any).{{packageSchema.shenanigans.web.drivingObject}} = {{packageSchema.shenanigans.web.drivingObject}};
