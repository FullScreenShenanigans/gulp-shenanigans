const fs = require("fs");

module.exports = (gulp, packageName) => {
    const merge = require("merge2");
    const mochaPhantomJS = require("gulp-mocha-phantomjs");
    const runSequence = require("run-sequence").use(gulp);
    const ts = require("gulp-typescript");
    const tslint = require("gulp-tslint");
    const typespace = require("gulp-typespace");

    const package = JSON.parse(fs.readFileSync("./package.json").toString());

    gulp.task("test", () => {
        return gulp.src("test/unit/index.html")
            .pipe(mochaPhantomJS());
    });

    gulp.task("tslint", () => {
        return gulp.src(["src/**/*.ts", "!src/**/*.d.ts"])
            .pipe(tslint({
                formatter: "verbose"
            }))
            .pipe(tslint.report());
    });

    gulp.task("tsc", () => {
        const project = ts.createProject("tsconfig.json");
        const output = project
            .src()
            .pipe(ts(project));

        return merge([
            output.dts.pipe(gulp.dest("src")),
            output.js.pipe(gulp.dest("src"))
        ]);
    });

    gulp.task("typespace", () => {
        const settings = {
            config: "./tsconfig.json",
            outFile: `${packageName}.ts`,
            namespace: packageName,
            pathPrefix: "src/",
            root: "."
        };

        typespace(settings)
            .pipe(gulp.dest("dist"));
    });

    gulp.task("watch", ["default"], () => {
        gulp.watch(["src/**/*.ts", "test/**/*.js"], ["default"]);
    });

    gulp.task("default", ["tsc", "tslint"], callback => {
        runSequence(["test", "typespace"], callback);
    });
};
