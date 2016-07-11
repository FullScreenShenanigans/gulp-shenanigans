# gulp-shenanigans

Unified Gulp tasks for FullScreenShenanigans projects.

## Why?

There are over two dozen repositories in the FullScreenShenanigans organization.
This unifies common build logic and can be updated more easily than editing each individual repository.

## Useful Tasks

* **`default`** - first lints and builds the code, then runs tests and compiles into `dist/`

* **`tslint`** - runs TSLint on `.ts` source files

* **`tsc`** - runs the TypeScript compiler on `.ts` source files

* **`test`** - runs tests required by `test/unit/index.html` in PhantomJS with Mocha.
