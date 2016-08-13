/* This file was auto-generated by gulp-shenanigans */
/// <reference path="../../node_modules/@types/chai/index.d.ts" />
/// <reference path="../../node_modules/@types/mocha/index.d.ts" />

/**
 * Grouping of mocha describe() tests.
 */
interface ITestHierarchy {
    /**
     * Hierarchical children within this describe() group.
     */
    children: {
        [i: string]: ITestHierarchy;
    };

    /**
     * Tests run in this describe().
     */
    tests: {
        [i: string]: () => void;
    };
}

/**
 * Combines mocha tests into their describe() groups.
 */
class MochaLoader {
    /**
     * The underlying mocha instance.
     */
    private mocha: any;

    /**
     * Root grouping of test hierarchies.
     */
    private testHierarchy: ITestHierarchy = {
        children: {},
        tests: {}
    };

    /**
     * Mocha describe() path for the next test to be added.
     */
    private currentTestPath: string[];

    /**
     * Initializes a new instance of the MochaLoader class.
     * 
     * @param mocha   The underlying mocha instance.
     */
    public constructor(mocha: any) {
        this.mocha = mocha;
        this.mocha.setup("bdd");
    }

    /**
     * Sets the current test path.
     * 
     * @param rawPath   A new current test path.
     */
    public setTestPath(rawPath: string): void {
        this.currentTestPath = rawPath.split("/");
    }

    /**
     * Adds a new test under the current test path.
     * 
     * @param testName   The name of the test.
     * @param test   A new test.
     */
    public addTest(testName: string, test: (done?: Function) => void): void {
        if (!this.currentTestPath) {
            throw new Error(`No test path defined before adding test '${testName}'.`);
        }

        let testHierarchy: ITestHierarchy = this.testHierarchy;

        for (const part of this.currentTestPath) {
            if (!testHierarchy.children[part]) {
                testHierarchy = testHierarchy.children[part] = {
                    children: {},
                    tests: {}
                };
            } else {
                testHierarchy = testHierarchy.children[part];
            }
        }

        testHierarchy.tests[testName] = test;
    }

    /**
     * Finalizes the tests' describe() hierarchy.
     */
    public describeTests(): void {
        this.describeTestHierarchy(this.testHierarchy);
    }

    /**
     * Runs tests using mocha.
     */
    public run(): void {
        this.mocha.run();
    }

    /**
     * Recursively describes a test hierarchy and its children hierarchies.
     * 
     * @param testHierarchy   A test hierarchy to describe.
     */
    private describeTestHierarchy(testHierarchy: ITestHierarchy): void {
        for (const testName in testHierarchy.tests) {
            if (testName in testHierarchy.tests) {
                it(testName, testHierarchy.tests[testName]);
            }
        }

        for (const childName in testHierarchy.children) {
            if (childName in testHierarchy.children) {
                describe(childName, (): void => this.describeTestHierarchy(testHierarchy.children[childName]));
            }
        }
    }
}

declare var mochaLoader: MochaLoader;
