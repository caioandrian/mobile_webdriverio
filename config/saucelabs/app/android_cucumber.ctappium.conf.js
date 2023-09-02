const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./app/e2e/steps_definitions/android/exemplo/ct_appium/ct_appium.steps.js'];

const testConfig = {
  specs: ['./app/e2e/spec/android/exemplo/ct_appium/ct_appium.feature'],

  capabilities: [{
    platformName : 'Android',
    'appium:deviceName': 'Samsung Galaxy S9 WQHD GoogleAPI Emulator',
    'appium:platformVersion': '9.0',
    'appium:deviceOrientation' : 'portrait',
    'appium:app': "storage:filename=CTAppium_1_0.apk",
    'appium:appPackage': "com.ctappium",
    'appium:appActivity': "com.ctappium.MainActivity",
    'sauce:options' : {
      appiumVersion: '1.22.1',
      build: "Webdriverio Android Project - APP CT_Appium",
      name: "CT_Appium_v1.0"
    }
  }]
};

exports.config = { ...baseConfig, ...testConfig };