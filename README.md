# gulp-shenanigans

Unified Gulp tasks for FullScreenShenanigans projects.

## Why?

There are over two dozen repositories in the FullScreenShenanigans organization.
This unifies common build logic and can be updated more easily than editing each individual repository.

## Tasks

* **`default`** - first lints and builds the code, then runs tests and compiles into `dist/`

In order of `default` task usage:

* **`clean`** - deletes built `.js` files from `src/` and all files in `dist/`

* **`tsc`** - runs the TypeScript compiler on `.ts` source files

* **`tslint`** - runs TSLint on `.ts` source files

* **`test`** - runs tests required by `test/unit/index.html` in PhantomJS with Mocha.

* **`typespace`** - converts `import`-based `.ts` source files in `src/` to a `namespace`-based file in `dist`

* **`dist`** - compiles the `namespace`-based `.ts` file in `dist/` file into `.js` equivalents
