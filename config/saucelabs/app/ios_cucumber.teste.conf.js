const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/ios/teste/teste.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/ios/teste/teste.feature'],

  //Não é possível acessar o APP de teste no device simulado
  capabilities: [{
    platformName: 'iOS',
    'appium:app': 'storage:filename=SauceLabs-Demo-App.ipa',
    'appium:deviceName': 'iPhone XS Simulator',
    'appium:platformVersion': '15.0',
    'sauce:options': {
      appiumVersion: '1.22.3',
      build: "Webdriverio IOS Project - APP Teste",
      name: "IOS - APP Teste"
    }
  }]
};

exports.config = { ...baseConfig, ...testConfig };