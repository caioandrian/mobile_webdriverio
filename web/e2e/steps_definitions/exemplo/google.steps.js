const {Given, Then, When, AfterAll} = require('@cucumber/cucumber');
const Google_Home = require('../../../../pages/android/google/index');

Given(`que tenha acessado na home do google`, async () => {
    await Google_Home.acessar_pagina()
});

Given(`fizer uma pesquisa pelo campo de pesquisar`, async () => {
    await Google_Home.pesquisar()
});

Then(`deverá ter aparecido a logo do google`, async () => {
    await Google_Home.valida_logo()
});

Then(`deverá apresentar os resultados`, async () => {
    await Google_Home.valida_resultados()
});