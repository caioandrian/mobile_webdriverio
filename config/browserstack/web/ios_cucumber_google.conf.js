const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/ios/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/ios/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',

  capabilities: [
    {
      'bstack:options': {
          projectName: "IOS",
          buildName: 'Navegador Safari',
          sessionName: 'Google',
          userName : baseConfig.user,
          accessKey : baseConfig.key,
          realMobile: true,
          deviceName : "iPhone 11 Pro",
          osVersion : "13",
          debug: true
        },
      browserName: 'Safari'
    }
  ],
};

exports.config = { ...baseConfig, ...testConfig };