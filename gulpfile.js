const del = require("del");
const gulp = require("gulp");
const merge = require("merge2");
const runSequence = require("run-sequence").use(gulp);
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

gulp.task("clean", () => {
    return del("lib/**/*");
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
        output.dts.pipe(gulp.dest("lib")),
        output.js.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("watch", ["default"], () => {
    return gulp.watch(["src/**/*.ts"], ["default"]);
});

gulp.task("default", callback => {
    runSequence(
        ["clean", "tslint"],
        ["tsc"],
        callback);
});
