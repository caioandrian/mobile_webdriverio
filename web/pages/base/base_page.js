var assert = require('assert');
var chai = require('chai');
require('expect-webdriverio')

//https://webdriver.io/docs/api/element/addValue
//https://webdriver.io/docs/api/expect-webdriverio
//https://www.chaijs.com/api/assert/
//https://nodejs.org/api/assert.html
//https://w3c.github.io/webdriver/#keyboard-actions
//https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

module.exports = class Base {

    async getNativeElementAndroid(elementID){
        return await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' + elementID + ")");
    }

    async typeNativeElementAndroid(elementID, text){
        let element = await this.getNativeElementAndroid(elementID)
        await element.addValue(text);
        assert.equal(await element.getText(), text);
    }

    async clickNativeElementAndroid(elementID){
        let myButton = await this.getNativeElementAndroid(elementID)
        await myButton.click()
    }

    async visit(endpoint = ""){
        await browser.url(endpoint);
        console.log("visitando: " + await browser.getUrl());
    }

    async checkElementOnPage(elementID, wait = 2000){
        await this.explicitWait(wait)

        let element = await this.getElementWithoutScrollView(elementID)
        let exist = await element.isExisting();

        console.log("elemento existe na pagina? " + exist)
        return exist
    }

    async checkElementOnPageByText(elementID, wait = 2000){
        await this.explicitWait(wait)

        let element = await this.getElementWithoutScrollViewAndText(elementID)
        let exist = await element.isExisting();

        console.log("elemento existe na pagina? " + exist)
        return exist
    }

    async checkElementOnPageExpectedTrue(elementID, wait = 2000){
        await this.waitUntilElementDisplayed(elementID)

        let element = await this.getElement(elementID)
        let exist = await element.isExisting();

        console.log("elemento existe na pagina? " + exist)
        return exist
    }

    async checkElementOnPageExpectedTrueByIndex(elementID, index, scroll_type){
        await this.waitUntilElementDisplayed(elementID)

        let element = await this.getElementByIndex(elementID, index, scroll_type)
        let exist = await element.isExisting();

        console.log("elemento existe na pagina? " + exist)
        return exist
    }

    async explicitWait(wait = 2000){
        await browser.pause(wait)
    }

    async extractContent(content) {
        let extract = await browser.execute( (s) => {
            var span = document.createElement('span');
            span.innerHTML = s;
            return span.textContent || span.innerText;
        }, content);
        return await extract
    }

    async reloadPage(){
        await browser.refresh();
    }

    async getElement(elementID, scroll_type = undefined){
        await this.scrollIntoViewElement(elementID, scroll_type);
        return await $(elementID);
    }

    async getElementWithoutScrollView(elementID){
        return await $(elementID);
    }

    async getElementWithoutScrollViewAndText(text){
        return await $(`//*[text()='${text}']`);
    }

    async getMultipleElements(elementID){
        return await $$(elementID);
    }

    async getElementByIndex(elementID, index = 0, scroll_type = undefined){
        await this.scrollIntoViewElementByIndex(elementID, index, scroll_type);
        let element = await $$(elementID)[index];
        return await element
    }

    async getElementValueByIndex(elementID, index = 0, scroll_type = undefined){
        await this.scrollIntoViewElementByIndex(elementID, index, scroll_type);
        let element = await $$(elementID)[index];
        return await element.getValue()
    }

    async getElementByText(text, scroll_type = undefined){
        let element = await $(`//*[text()='${text}']`);
        await this.scrollIntoViewElementByElementText(text, scroll_type);
        return await element
    }

    async getElementByContainsText(text, scroll_type = undefined){
        let element = await $(`//*[contains(text(), '${text}')]`);
        await this.scrollIntoViewElementByElementContainsText(text, scroll_type);
        return await element
    }

    async getElementByContainsTextAndIndex(text, index = 0, scroll_type = 'center'){
        let element = await $$(`//*[contains(text(), '${text}')]`)[index];
        await element.scrollIntoView({ block: scroll_type});
        return await element
    }
    
    async getElementText(elementID, scroll_type = undefined){
        let element = await this.getElement(elementID, scroll_type);
        return await element.getText();
    }

    async getElementTextByIndex(elementID, index, scroll_type = undefined){
        let element = await this.waitUntilElementDisplayedByIndex(elementID, index, scroll_type)
        return await element.getText();
    }

    async getElementAttribute(elementID, attr){
        let element = await this.getElement(elementID)
        return await element.getAttribute(attr)
    }

    async getElementAttributeByIndex(elementID, attr, index = 0){
        let element = await this.getElementByIndex(elementID, index)
        return await element.getAttribute(attr)
    }

    async setElementAttribute(elementID, attr, value){
        await this.waitUntilElementDisplayed(elementID)
        await browser.execute( (selector, at, val) => {
            const elem = document.querySelector(selector);
            elem.setAttribute(at, val)
        }, elementID, attr, value);
    }

    async getElementValue(elementID){
        let element = await this.getElement(elementID)
        console.log("el value: " + await element.getValue())
        return await element.getValue()
    }

    async getUrl(){
        console.log("url: " + await browser.getUrl())
        return await browser.getUrl();
    }

    async removeElementFromDOM(elementID){
        await this.waitUntilElementDisplayed(elementID)
        await browser.execute( (el) => {
            const elemToRemove = document.querySelector(el);
            elemToRemove.remove();
        }, elementID);
    }

    async getElementLength(elementID){
        console.log(await $$(elementID).length)
        return await $$(elementID).length;
    }

    async scrollIntoViewElement(elementID, scroll_type = 'center'){
        let element = await $(elementID);
        await element.waitForExist({ timeout: 30000 });

        //await element.scrollIntoView();
        //await element.scrollIntoView({behavior: "smooth", block: scroll_type});
        await element.scrollIntoView({block: scroll_type})
    }

    async scrollIntoViewElementByIndex(elementID, index = 0, scroll_type = 'center'){
        let element = await $$(elementID)[index];
        await element.waitForExist({ timeout: 30000 });

        //await element.scrollIntoView();
        //await element.scrollIntoView({behavior: "smooth", block: scroll_type});
        await element.scrollIntoView({block: scroll_type});
    }

    async scrollIntoViewElementByElementText(text, scroll_type = 'center'){
        let element = await $(`//*[text()='${text}']`);
        await element.waitForExist({ timeout: 30000 });

        //await element.scrollIntoView();
        //await element.scrollIntoView({behavior: "smooth", block: scroll_type});
        await element.scrollIntoView({block: scroll_type});
    }

    async scrollIntoViewElementByElementContainsText(text, scroll_type = 'center'){
        let element = await $(`//*[contains(text(), '${text}')]`);
        await element.waitForExist({ timeout: 30000 });

        //await element.scrollIntoView();
        await element.scrollIntoView({behavior: "smooth", block: scroll_type});
        //await element.scrollIntoView({block: scroll_type});
    }

    async switchContext(id = 0){
        //id 0 = NATIVE_APP / 1 = WEBVIEW_1
        await driver.getContexts().then(function (contexts) {
            console.log(contexts)
            return driver.switchContext(contexts[id]);
        })
    }

    async switchContextToDefault(){ 
        await browser.switchToFrame(null)
    }

    async switchContextByElement(elementID = null){
        let frame = await $(elementID)
        await browser.switchToFrame(frame)
    }

    async switchContextByElementAndIndex(elementID = null, index){
        let frame = await $$(elementID)[index]
        await browser.switchToFrame(frame)
    }

    async clearElementValue(elementID){
        let element = await this.getElement(elementID)
        await element.clearValue();
    }

    async typeElement(elementID, text){
        let element = await this.waitUntilElementDisplayed(elementID)
        await this.clearElementValue(elementID)
        await element.addValue(text);
        console.log(await element.getValue())
    }

    async setElementValue(elementID, value){
        let element = await this.getElement(elementID)
        await browser.keys("Delete")
        await element.setValue(value);
        console.log(await element.getValue())
    }

    async sendKey(key){
        await this.explicitWait()
        await browser.keys(key)
        await this.explicitWait()
    }

    async sendKeyToElement(elementID, key){
        await this.doubleClickElement(elementID)
        let element = await $(elementID)
        await browser.keys("Delete")
        await browser.keys("Home")
        await browser.keys(key)
        console.log(await element.getValue())
    }

    async clickElementCheckbox(elementID, scroll_type = undefined){
        let myButton = await this.getElement(elementID, scroll_type);
        await myButton.click({ force: true });
    }

    async clickElement(elementID, scroll_type = undefined){
        let myButton = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await myButton.click({ force: true });
    }

    async doubleClickElement(elementID, scroll_type = undefined){
        let myButton = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await myButton.doubleClick();
    }

    async clickElementByIndex(elementID, index = 0, scroll_type = undefined){
        let myButton = await this.waitUntilElementDisplayedByIndex(elementID, index, scroll_type)
        await myButton.click({ force: true })
    }

    async clickElementByText(text, scroll_type = undefined){
        let myButton = await this.waitUntilElementDisplayedByContainsText(text, scroll_type)
        await myButton.click({ force: true })
    }

    async slideElementByHorizontal(elementID, def_value){
        await this.validateElementIsVisible(elementID)

        let element = await this.getElement(elementID)
        let value = def_value
        let delta = 50
        let xStart = element.getLocation('x') + delta;
        let click_x = xStart + (element.getSize('width') -2 * delta) * value
        let click_y = element.getLocation('y') + (element.getSize('height') / 2)
        element.touchAction(['press', {action: 'moveTo', x: click_x, y: click_y}, 'release'])
    }

    async waitElementUntilEnabled(elementID, scroll_type = undefined){
        let element = await this.getElement(elementID, scroll_type)
        await element.waitForEnabled({timeout: 30000});
        return element
    }

    async waitUntilElementDisplayed(elementID, scroll_type = undefined){
        let element = await this.getElement(elementID, scroll_type)
        await element.waitForDisplayed({timeout: 30000});
        return element
    }

    async waitUntilElementDisplayedByIndex(elementID, index = undefined, scroll_type = undefined){
        let element = await this.getElementByIndex(elementID, index, scroll_type)
        await element.waitForDisplayed({timeout: 30000});
        return element
    }

    async waitUntilElementDisplayedByContainsText(text, scroll_type = undefined){
        let element = await this.getElementByContainsText(text, scroll_type)
        await element.waitForDisplayed({timeout: 30000});
        return element
    }

    async waitUntilElementClickable(elementID, scroll_type = undefined){
        let element = await this.getElement(elementID, scroll_type)
        await element.waitForClickable({timeout: 30000});
        return element
    }

    async waitUntilElementClickableByIndex(elementID, index = undefined, scroll_type = undefined){
        let element = await this.getElementByIndex(elementID, index, scroll_type)
        await element.waitForClickable({timeout: 30000});
        return element
    }

    async waitUntilElementAttrChangeTo(elementID, attr, new_value, pscroll = true){
        let element

        if(pscroll)
            element = await this.getElement(elementID)
        else
            element = await this.getElementWithoutScrollView(elementID)
        
        await element.waitUntil(async function () {
            return await (await this.getAttribute(attr)) == new_value
        }, {
            timeout: 20000,
            timeoutMsg: 'expected text to be different after 20s'
        });
        return element
    }

    async waitUntilElementTextChangeTo(elementID, new_value, pscroll = true){
        let element

        if(pscroll)
            element = await this.getElement(elementID)
        else
            element = await this.getElementWithoutScrollView(elementID)

        await element.waitUntil(async function () {
            return await (await this.getText()) == new_value
        }, {
            timeout: 20000,
            timeoutMsg: 'expected text to be different after 20s'
        });
        return element
    }

    async validateElementIsChecked(elementID, value_expected = true){
        //TODO não está funcionando no browserstack?
        /*let myButton = await this.getElement(elementID)
        assert.ok(await myButton.getAttribute('checked'), value_expected)*/
    }

    async validateElementIsVisible(elementID, scroll_type = undefined) {
        let element = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await element.isDisplayed(); 
    }

    async validateElementContainsText(elementID, text, scroll_type = undefined) {
        let element = await this.waitUntilElementDisplayed(elementID, scroll_type)
        chai.assert.include(await element.getText(), text)
    }

    async validateElementHaveText(elementID, text, scroll_type = undefined) {
        let element = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await expect(element).toHaveText(text);
    }

    async validateElementContainAttrValue(elementID, attr, text) {
        let element = await this.getElement(elementID)
        await expect(element).toHaveAttrContaining(attr, text)
    }

    async validateElementByTextContainAttrValue(text, attr, expected_text, scroll_type = undefined) {
        let element = await this.waitUntilElementDisplayedByContainsText(text, scroll_type)
        await expect(element).toHaveAttrContaining(attr, expected_text)
    }

    async validateElementVal(elementID, text, scroll_type = undefined) {
        let element = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await expect(element).toHaveValue(text, { ignoreCase: true })
    }

    async validateElementByTextIsVisible(text, scroll_type = undefined){
        let element = await this.waitUntilElementDisplayedByContainsText(text, scroll_type)
        await element.isDisplayed();
    }

    async validateElementLengthByChildren(elementID, value, scroll_type = undefined){
        let element = await this.waitUntilElementDisplayed(elementID, scroll_type)
        await expect(element).toHaveChildren(value)
    }

    async validateElementLength(elementID, value){
        //ver necessidade de mudar
        let element = await this.getMultipleElements(elementID);
        console.log(element.length)
        await expect(element).toBeElementsArrayOfSize(value)
    }

    async validatePageContainsText(text, scroll_type = undefined){
        let element = await this.waitUntilElementDisplayedByContainsText(text, scroll_type)
        await element.isDisplayed(); 
    }

    async validatePageContainsTextByIndex(text, index = 0, scroll_type = undefined){
        let element = await this.getElementByContainsTextAndIndex(text, index, scroll_type)
        await element.isDisplayed();
    }

    async validateUrlPartialEndpoint(endpoint){
        //TODO não está funcionando
        let url = await browser.getUrl();
        await expect(url).toHaveUrlContaining(endpoint)
    }

    async validateRequestStatusCode(response_request, expectCode){
        chai.expect(response_request.status).to.eq(expectCode)
    }

    async validateRequestHaveProperty(response_request, prop){
        chai.expect(response_request).to.have.deep.property(prop)
    }

    async validateRequestProperty(response_request, prop, expected_value){
        chai.expect(response_request).to.have.deep.property(prop, expected_value)
    }

    async validateRequestDataLength(response_request, expected_value){
        chai.expect(response_request).to.have.lengthOf(parseInt(expected_value))
    }

    async validateRequestMapInclude(response_request, expected_value){
        chai.expect(response_request).to.include(expected_value);
    }
}