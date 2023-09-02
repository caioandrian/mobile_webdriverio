const { config: baseConfig } = require('../../wdio.cucumber.shared.conf.js');

const steps = ['./app/e2e/steps_definitions/android/exemplo/common/common.js']
var files = fs.readdirSync('./app/e2e/steps_definitions/android/exemplo/ct_appium/');
files.forEach((file)=> { steps.push("./app/e2e/steps_definitions/android/exemplo/ct_appium/" + file) })

baseConfig.cucumberOpts.require = steps;

const testConfig = {
  specs: ['./app/e2e/spec/android/exemplo/ct_appium/**.feature'],
  
  capabilities: [{
    project: "Webdriverio Android Project",
    build: 'CT_Appium_v1.0',
    device: 'Google Pixel 3',
    os_version: "9.0",
    automationName:'UIAutomator2',
    app: process.env.BROWSERSTACK_APP_ID ||  'bs://848f502356e303cc4e50b9669c64351a41a0c666',
    'browserstack.debug': true,
    /*'browserstack.video' : false,
    'browserstack.appiumLogs': false,
    'browserstack.deviceLogs': false*/
  }]
};

exports.config = { ...baseConfig, ...testConfig };
