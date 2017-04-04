## Build Process

{{package.name}} uses [Gulp](http://gulpjs.com/) to automate building, which requires [Node.js](http://node.js.org).

To build from scratch, install NodeJS and run the following commands:

```
npm install -g gulp
npm install
{{#buildCommands}}
{{.}}
{{/buildCommands}}
```

{{{extra}}}

See [Build Details](https://github.com/FullScreenShenanigans/Documentation/blob/master/Build%20Details.md) for detailed Gulp usage.
