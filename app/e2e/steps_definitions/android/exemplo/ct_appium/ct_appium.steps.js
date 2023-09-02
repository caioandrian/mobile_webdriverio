const {Given, Then, When, After} = require('@cucumber/cucumber');

const CT_Appium_Menu = require('../../../../../pages/android/ct_appium/menu/index');
const CT_Appium_Abas = require('../../../../../pages/android/ct_appium/abas/index');
const CT_Appium_DragNdrop = require('../../../../../pages/android/ct_appium/dragndrop/index');
const CT_Appium_Formulario = require('../../../../../pages/android/ct_appium/formulario/index');

After(async () => {
    await driver.reset();
});

Given(`que tenha acessado o submenu abas`, async () => {
    await CT_Appium_Menu.acessar_submenu_abas();
    await CT_Appium_Abas.valida_aba1();
});

Given(`que tenha acessado o submenu dragndrop`, async () => {
    await CT_Appium_Menu.acessar_submenu_dragndrop();
});

Given(`que tenha acessado o submenu formulário`, async () => {
    await CT_Appium_Menu.acessar_submenu_formulario();
});

When(`clicar na aba 2`, async () => {
    await CT_Appium_Abas.clicar_aba2();
});

When(`preencher os dados no formulário`, async () => {
    await CT_Appium_Formulario.preencher_dados();
});

When(`arrastar o primeiro elemento do exemplo até o terceiro elemento`, async () => {
    await CT_Appium_DragNdrop.teste();
});

Then(`então deverá apresentar o conteúdo da aba 2`, async () => {
    await CT_Appium_Abas.valida_aba2();
});

Then(`então deverá apresentar os resultados salvos corretamente`, async () => {
    await CT_Appium_Formulario.valida_resultados();
});

Then(`deverá ter alterado a ordem dos elementos no exemplo`, async () => {
    await CT_Appium_DragNdrop.teste();
});