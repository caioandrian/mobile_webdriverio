module.exports = ELEMENTS = {
    FORM: {
        //https://developer.android.com/reference/android/support/test/uiautomator/UiSelector#childSelector(android.support.test.uiautomator.UiSelector)
        //uiautomator2: content_desc
        INPUT_NOME: '//android.widget.EditText[@text="Nome"]',
        INPUT_CHECKBOX: '//android.widget.CheckBox[@content-desc="check"]',
        INPUT_SWITCH: '//android.widget.Switch[@content-desc="switch"]',
        XPATH_SELECT_CONSOLE: '//android.widget.Spinner//android.widget.TextView',
        OPCAO_SELECT_CONSOLE: '//android.widget.CheckedTextView[@text = "XBox One"]',
        DATA: '//android.widget.TextView[@text = "01/01/2000"]',
        BTN_OK: '//android.widget.Button[@text = "OK"]',
        DATA_POS: '//android.widget.TextView[@text = "5/2/2000"]',
        FORM_SEEKER: '//android.widget.SeekBar[@content-desc="slid"]',
        BTN_SALVAR: '//android.widget.TextView[@text = "SALVAR"]'
    },
    DATA: {
        FRAME: '//android.widget.FrameLayout',
        DIA: '//com.android.internal.widget.ViewPager//android.view.View//android.view.View[@text = "5"]'
    },
    RESULTADO: {
        TXT_NOME: '//android.widget.TextView[contains(@text, "Nome:")]',
        TXT_CONSOLE: 'android.widget.TextView[contains(@text, "Console:")]',
        TXT_SWITCH: 'android.widget.TextView[contains(@text, "Switch:")]',
        TXT_CHECKBOX: 'android.widget.TextView[contains(@text, Checkbox:")]',
        TXT_SEEKBAR: 'android.widget.TextView[contains(@text, "Slider:")]',
        TXT_DATA: 'android.widget.TextView[contains(@text, "Data:")]',
    }
}