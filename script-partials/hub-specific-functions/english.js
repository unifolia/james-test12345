/* eslint-disable comma-dangle */
const helper = require('../helper-functions.js');

module.exports = function englishPartial() {
  // custom Hub functions

  let englishLoaded = false;

  // -- Hub Events -- //
  window.addEventListener('uberflip.load', () => {
    if (!englishLoaded) {
      // Call all on load functions here

      /* --- Test Start for getting page type --- */

      const pageType = helper.returnPageType();

      const createdElement = helper.createElem(
        'button',
        {
          type: 'button',
          class: 'class-one class-two',
          'aria-haspopup': 'true',
          'aria-expanded': 'false',
        },
        'Click Me'
      );

      /* --- Test end --- */

      englishLoaded = true;
    }
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.itemsLoaded', () => {
    // Call all itemsLoaded events here
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.resize', () => {
    // Call all resize events here
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.scroll', () => {
    // Call all scroll events here
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.recoItemsLoaded', () => {
    // Call all reco panel items loaded events here
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.ctaActivate', (ctaId) => {
    // Call all ctaActivate events here
  }); //eslint-disable-line no-unused-vars
  window.addEventListener('uberflip.ctaFormSubmitSuccess', () => {
    // Call all ctaFormSubmitSuccess events here
  });
};
