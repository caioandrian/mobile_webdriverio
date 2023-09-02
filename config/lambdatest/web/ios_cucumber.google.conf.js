const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/ios/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/ios/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',

  capabilities : [{
    "deviceName": "iPhone XS",
    'platformVersion': "12.0",
    "platformName": "ios",
    "build": 'Webdriverio IOS Project',
    "name": 'Navegador - Google',
    'nativeWebScreenshot': true,
    "newCommandTimeout": 300,
    //'console': true,
    //"visual": true,
    //"video": true,
    //'isRealMobile': true,
    //'autoGrantPermissions': true,
    //'autoAcceptAlerts': true,
  }],

  /*beforeSession: function (config, capabilities, specs) {
    capabilities.name=specs[0].split(/(\\|\/)/g).pop() || undefined;
  },*/

  after: function (result, capabilities, specs) {
    driver.execute("lambda-status=".concat(result==0?"passed":"failed"),undefined);
  }
};

exports.config = { ...baseConfig, ...testConfig };