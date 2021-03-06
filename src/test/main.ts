/* This file was auto-generated by gulp-shenanigans */

import * as chai from "chai";
import "mocha"; // tslint:disable-line no-import-side-effect
import * as sinonChai from "sinon-chai";

import { MochaLoader } from "./utils/MochaLoader";

declare const requirejs: any;
declare const testDependencies: string[];
declare const testPaths: string[];

chai.use(sinonChai);

/**
 * Combines mocha tests into their describe() groups.
 */
export const mochaLoader: MochaLoader = new MochaLoader();

/**
 * Adds a new test under the current test path.
 *
 * @param testName   The name of the test.
 * @param test   A new test.
 */
export const it: typeof mochaLoader.it = mochaLoader.it.bind(mochaLoader);

/**
 * Adds a new test under a custom test path.
 *
 * @param path   Extra path after the current test path.
 * @param testName   The name of the test.
 * @param test   A new test.
 */
export const under: typeof mochaLoader.under = mochaLoader.under.bind(mochaLoader);

/**
 * Informs RequireJS of the file location for a test dependency.
 *
 * @param testDependencies   Modules depended upon for tests.
 */
function redirectTestDependencies(dependencies: string[]): void {
    requirejs.config({
        packages: dependencies.map((dependency: string) => ({
            name: dependency,
            main: "index"
        }))
    });
    for (const dependencyUpper of dependencies) {
        const dependency = dependencyUpper.toLowerCase();

        requirejs.config({
            map: {
                [`${dependency}/lib`]: {
                    lib: "src"
                }
            },
            paths: {
                [dependency]: `../node_modules/${dependency}/src`,
                [`${dependency}/lib`]: `../node_modules/${dependency}/lib`
            }
        });
    }
}

/**
 * Recursively loads test paths under mocha loader.
 *
 * @param loadingPaths   Test paths to load.
 * @param i   Which index test path to load.
 * @param onComplete   A callback for when loading is done.
 */
function loadTestPaths(loadingPaths: string[], i: number, onComplete: () => void): void {
    "use strict";

    if (i >= loadingPaths.length) {
        onComplete();
        return;
    }

    mochaLoader.setTestPath(loadingPaths[i]);
    requirejs(
        [loadingPaths[i]],
        (): void => {
            loadTestPaths(loadingPaths, i + 1, onComplete);
        });
}

((): void => {
    redirectTestDependencies(testDependencies);

    loadTestPaths(
        testPaths,
        0,
        (): void => {
            mochaLoader.describeTests();
            mochaLoader.run();
        });
})();
