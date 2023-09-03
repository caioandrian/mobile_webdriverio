const { config: baseConfig } = require('../../wdio.cucumber.shared.conf.js');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/ios/teste/teste.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/ios/teste/teste.feature'],
  
  //para ios será preciso outro app
  capabilities: [{
    project: "Webdriverio IOS Project",
    build: 'Teste',
    device: 'iPhone XS',
    os_version: "12",
    automationName:'xcuitest',
    app: process.env.BROWSERSTACK_APP_ID ||  'bs://xxxxxxx',
    'browserstack.debug': true,
    /*'browserstack.video' : false,
    'browserstack.appiumLogs': false,
    'browserstack.deviceLogs': false*/
  }]
};

exports.config = { ...baseConfig, ...testConfig };
