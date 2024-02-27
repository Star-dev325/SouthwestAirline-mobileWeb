module.exports = async (page, scenario) => {
  const clickAllSelector = scenario.clickAllSelector || scenario.clickAllSelectors;
  const clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  const scrollToSelector = scenario.scrollToSelector;

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex);
      await page.hover(hoverSelectorIndex);
    }
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitForSelector(clickSelectorIndex);
      await page.click(clickSelectorIndex);
    }
  }

  if (clickAllSelector) {
    for (const selector of [].concat(clickAllSelector)) {
      await page.waitForSelector(selector);
      await page.$$eval(selector, (elements) => elements.forEach(element => element.click()));
    }
  }

  if (postInteractionWait) {
    if (parseInt(postInteractionWait) > 0) {
      await page.waitForTimeout(postInteractionWait);
    } else {
      await page.waitForSelector(postInteractionWait);
    }
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
