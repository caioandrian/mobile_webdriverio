const { config: baseConfig } = require('./../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',

  capabilities: [
    {
      platformName: 'Android',
      browserName: 'Chrome',
      'appium:deviceName': 'Samsung Galaxy S9 WQHD GoogleAPI Emulator',
      'appium:platformVersion': '9.0',
      'sauce:options': {
        appiumVersion: '1.22.1',
        build: "Webdriverio Android Project",
        name: "Navegador - Google",
      }
    }
  ],

  after: function (result, capabilities, specs) {
    driver.execute("sauce:job-result=".concat(result==0 ? "passed":"failed"),undefined);
  }
}

exports.config = { ...baseConfig, ...testConfig };