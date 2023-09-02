const exec = require('child_process').execSync; 
const rimraf = require('rimraf');

exports.config = {
    user: process.env.LT_USERNAME || "xxxx",
    key: process.env.LT_ACCESS_KEY || "xxxxx",
    hostname: "hub.lambdatest.com",
    path: "/wd/hub",
    port: 80,

    framework: 'cucumber',
    logLevel: 'warn',
    coloredLogs: true,
    deprecationWarnings: true,
    outputDir: './webdriverio-report',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 50000,
    connectionRetryCount: 1,

    //specs: ['web/browserstack/features/**/*.feature'],
    reporters: [
        'spec',
        ['allure', {
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true
        }],
    ],
    
    cucumberOpts: {
        //require: ['./web/browserstack/steps_definitions/**/*.steps.js'],
        //requireModule: ['@babel/register'],
        backtrace: false,
        compiler: [],
        dryRun: false,
        failFast: true,
        //format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tags: [],
        timeout: 300000,
        ignoreUndefinedDefinitions: false,
        tagExpression: 'not @skip',
    },
    maxInstances: 1,

    before: async () => {
        browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
            if (!force) {
                try {
                    // attempt to click
                    await origClickFunction()
                    return null
                } catch (err) {
                    if (err.message.includes('not clickable at point')) {
                        console.warn('WARN: Element', this.selector, 'is not clickable.',
                            'Scrolling to it before clicking again.')
        
                        return origClickFunction()
                    }
                    throw err
                }
            }
        
            await browser.execute((el) => {
                el.click()
            }, this)
        }, true) // don't forget to pass `true` as 3rd argument
    },

    onPrepare: async () => {  
        await exec("rimraf allure-results && rimraf allure-report");
    },

    onComplete: async function() {
        await rimraf.sync('*.zip')
    },

    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        if (scenario.error) {
            await browser.takeScreenshot();
        }
    },

    // This code is responsible for taking the screenshot in case of error and attaching it to the report
    /*afterStep(uri, feature, scenario) {
        if (scenario.error) {
            driver.takeScreenshot();
        }
    },*/

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Runs before a Cucumber feature
     * @param {Object} feature feature details
     */
    // beforeFeature: function (feature) {
    // },
    /**
     * Runs before a Cucumber scenario
     * @param {Object} scenario scenario details
     */
     beforeScenario: function (scenario) {
    },
    /**
     * Runs before a Cucumber step
     * @param {Object} step step details
     */
    // beforeStep: function (step) {
    // },
    /**
     * Runs after a Cucumber step
     * @param {Object} stepResult step result
     */
    // afterStep: function (stepResult) {
    // },
    /**
     * Runs after a Cucumber scenario
     * @param {Object} scenario scenario details
     */
    // afterScenario: function (scenario) {
    // },
    /**
     * Runs after a Cucumber feature
     * @param {Object} feature feature details
     */
    // afterFeature: function (feature) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onComplete: function(exitCode, config, capabilities) {
    // }
}
