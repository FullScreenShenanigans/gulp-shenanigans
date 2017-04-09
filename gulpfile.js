var del = require("del");
var gulp = require("gulp");
var merge = require("merge2");
var runSequence = require("run-sequence").use(gulp);
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");

var createTsProject = (function () {
    var projects = {};

    return function (fileName) {
        var ts = require("gulp-typescript");

        return projects[fileName] = ts.createProject(fileName);
    };
})();

gulp.task("clean", function () {
    return del("lib/**/*");
});

gulp.task("tslint", function () {
    return gulp
        .src([
            "src/**/*.ts",
            "!src/**/*.d.ts"
        ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("tsc", function () {
    var project = createTsProject("tsconfig.json");
    var output = project
        .src()
        .pipe(project());

    return merge([
        output.dts.pipe(gulp.dest("lib")),
        output.js.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("watch", ["tsc"], function () {
    return gulp.watch(["src/**/*.ts"], ["tsc"]);
});

gulp.task("default", function (callback) {
    runSequence(
        ["clean", "tslint"],
        ["tsc"],
        callback);
});
