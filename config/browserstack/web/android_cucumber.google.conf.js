const { config: baseConfig } = require('./../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',
  
  capabilities: [
    {
      'bstack:options': {
          projectName: "Android",
          buildName: 'Navegador Chrome',
          sessionName: 'Google',
          userName : baseConfig.user,
          accessKey : baseConfig.key,
          realMobile: true,
          deviceName : "Samsung Galaxy S20",
          osVersion : "10.0",
          debug: true
      },
      browserName: 'chrome'
    }
  ],
};

exports.config = { ...baseConfig, ...testConfig };