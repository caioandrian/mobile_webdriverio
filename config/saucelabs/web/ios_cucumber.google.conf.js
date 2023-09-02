const { config: baseConfig } = require('../wdio.cucumber.shared.conf');

baseConfig.cucumberOpts.require = ['./web/e2e/steps_definitions/exemplo/google.steps.js'];

const testConfig = {
  specs: ['./web/e2e/spec/ios/exemplo/google.feature'],
  //baseUrl: 'https://google.com/',

  capabilities: [
    {
      platformName: 'iOS',
      browserName: 'Safari',
      'appium:deviceName': 'iPhone XS Simulator',
      'appium:platformVersion': '15.0',
      'sauce:options': {
        appiumVersion: '1.22.3',
        build: "Webdriverio IOS Project",
        name: "IOS - Navegador - Google",

        //HABILITAR NAS CONFIGURACOES DA ORGANIZAÇÃO SAUCELABS: 
        //REQUIRE SAUCE CONNECT PROXY/VPN TRUE
        //C:\Tunnel_saucelabs\bin>
        //o id muda dinamicamente?
        //sc -u oauth-caioautomacaoqa-7ad6e -k e2d67034-c755-4688-a910-702144b339df --region us-west --tunnel-name teste-edtech
        //tunnelName: 'teste-edtech'
      }
    }
  ],

  after: function (result, capabilities, specs) {
    driver.execute("sauce:job-result=".concat(result==0 ? "passed":"failed"),undefined);
  }
};

exports.config = { ...baseConfig, ...testConfig };