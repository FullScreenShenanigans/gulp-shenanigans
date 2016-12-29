import { {{package.name}} } from "./{{package.name}}";

const {{taskGroups.web.drivingObject}}: {{package.name}} = new {{package.name}}();

document.getElementById("game")!.appendChild({{taskGroups.web.drivingObject}}.container);

(window as any).{{taskGroups.web.drivingObject}} = {{taskGroups.web.drivingObject}};
