# gulp-shenanigans
[![NPM version](https://badge.fury.io/js/gulp-shenanigans.svg)](http://badge.fury.io/js/gulp-shenanigans)

Unified Gulp tasks for FullScreenShenanigans projects.

## Why?

There are over two dozen repositories in the FullScreenShenanigans organization.
This unifies common build logic and can be updated more easily than editing each individual repository.
Updates can be brought in using `npm update`.

### `shenanigans.json`

gulp-shenanigans is configured a project's `shenanigans.json`.
The settings match the `IProjectSchema` interface in [src/definitions.ts](src/definitions.ts).


### Running TypeScript

It's often faster to use the TypeScript compiler directly instead of the Gulp tasks.

```cmd
tsc
```

Use the `-w` flag to trigger incremental compilation whenever a file changes.

```cmd
tsc -w
```

## Tasks in Detail

### `default`

The `default` task runs `src`, `lib`, `test`, `docs`, and any custom task groups in order.

### `src`

Compiles source files in-place in the `/src` folder.

* **`src:tsc`** - Runs the TypeScript compiler on source `.ts` files in-place.
* **`src:tslint`** - Runs TSLint on source `.ts` files.

*Sub-tasks included in the `web` group:*

* *`src:scss`* - Runs the Sass compiler on source `.scss` files in-place
* *`src:scssLint`* - Runs scss-lint on source `.scss` files.

### `lib`

Compiles source files into the `/lib` folder.

* **`lib:tsc`** - Runs the TypeScript compiler on source `.ts` files to create `/lib` output.

*Sub-tasks included in the `web` group:*

* *`lib:copy`* - Copies web resource files into the `/lib` folder.
* *`lib:cssMin`* - Minifies CSS from `/src` into the `/lib` folder.
* *`lib:html`* - Minifies HTML from `/src` into the `/lib` folder.

### `test`

Creates test runners and runs them in the `/test` folder.

* **`test:html`** - Creates an `index.html` that can run tests.
* **`test:utilities`** - Copies configuration and utility files into the project directory.
* **`test:tsc`** - Compiles test .ts files in-place.
* **`test:run`** - Runs tests.

### `docs`

Generates HTML documentation under `docs/` based on source file comments.

* `docs:typedoc`
