const { config: baseConfig } = require('../../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',
  
  capabilities: [
    {
      browserName: 'chrome',
      platformName: "Android",
      platformVersion: "10",
      automationName: "UiAutomator2",
      deviceName: "nexus5",
      newCommandTimeout: 300,
      chromedriverExecutable: "C:\\chrome_driver\\chromedriver74.exe",
      //chromedriverExecutable: "./chromedriver83_83.exe",
      clearDeviceLogsOnStart: true
    }
  ]
};

exports.config = { ...baseConfig, ...testConfig };