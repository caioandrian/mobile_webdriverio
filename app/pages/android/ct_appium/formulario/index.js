const Base = require('../../../base/android_base_page');
const el = require('./elements');

class CT_Appium_Formulario extends Base{

    async preencher_dados(){
        await super.validateElementIsVisible(el.FORM.INPUT_NOME)
        await super.typeElement(el.FORM.INPUT_NOME, "Browsertack01")
        
        await super.clickElement(el.FORM.INPUT_CHECKBOX)
        await super.validateElementByIsChecked(el.FORM.INPUT_CHECKBOX)

        await super.clickElement(el.FORM.INPUT_SWITCH, false)
        await super.validateElementByIsChecked(el.FORM.INPUT_SWITCH, false)
        
        /*await super.clickElement(el.FORM.XPATH_SELECT_CONSOLE)
        await super.clickElement(el.FORM.OPCAO_SELECT_CONSOLE)*/

        await super.clickElement(el.FORM.DATA)
        await super.validateElementIsVisible(el.DATA.FRAME)
        await super.clickElement(el.DATA.DIA)
        await super.clickElement(el.FORM.BTN_OK)
        await super.validateElementIsVisible(el.FORM.DATA_POS)

        await super.slideHorizontalElement(el.FORM.FORM_SEEKER, 1)

        await super.clickElement(el.FORM.BTN_SALVAR)
    }

    async valida_resultados(){
        await super.validateElementContainsText(el.RESULTADO.TXT_NOME, "Nome: Browsertack01")
       /* await super.validateElementContainsText(el.RESULTADO.TXT_CONSOLE, "Console: xone")
        await super.validateElementContainsText(el.RESULTADO.TXT_SEEKBAR, "Slider: 50")
        await super.validateElementContainsText(el.RESULTADO.TXT_SWITCH, "Switch: Off")
        await super.validateElementContainsText(el.RESULTADO.TXT_CHECKBOX, "Checkbox: Marcado")
        await super.validateElementContainsText(el.RESULTADO.TXT_DATA, "Data: 5/2/2000")*/
    }
}

module.exports = new CT_Appium_Formulario();