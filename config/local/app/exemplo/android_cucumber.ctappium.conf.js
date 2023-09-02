const { config: baseConfig } = require('../../wdio.cucumber.shared.conf');

var fs = require('fs');

const steps = ['./app/e2e/steps_definitions/android/exemplo/common/common.js']
var files = fs.readdirSync('./app/e2e/steps_definitions/android/exemplo/ct_appium/');
files.forEach((file)=> { steps.push("./app/e2e/steps_definitions/android/ct_appium/" + file) })

baseConfig.cucumberOpts.require = steps;

const testConfig = {
  specs: ['./app/e2e/spec/android/exemplo/ct_appium/**.feature'],
  
  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": "nexus5",
      "appium:app": 'C:\\android-apps\\ct_appium.apk',
      "appium:clearDeviceLogsOnStart": true,
      "appium:autoGrantPermissions": true
    }
  ]
};

exports.config = { ...baseConfig, ...testConfig };