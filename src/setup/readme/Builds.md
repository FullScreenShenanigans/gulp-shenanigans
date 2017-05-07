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

See [gulp-shenanigans](https://github.com/FullScreenShenanigans/gulp-shenanigans) for detailed Gulp usage.
