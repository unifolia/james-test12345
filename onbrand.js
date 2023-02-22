// -- Imports -- //
require('@uf-onbrand/onbrand-utility-functions-tv2/build/conditional-babel-polyfill.bundle.js'); // use all the things!
const onbrandUtilityFunctionsTv2 = require('@uf-onbrand/onbrand-utility-functions-tv2');
const devOptions = require('./dev-options.js'); //Development options
const onbrandScss = require('./onbrand.scss'); //Onbrand styles
const clientScss = require('./client/client.scss'); //client styles
const htmlHeader = require('./includes/header.html');
const htmlFooter = require('./includes/footer.html');

// Optional function - convert HTML elements
const replaceHTMLElements = require('./modules/replaceHTMLElements.js');

module.exports = {
  initOnbrand: function initOnbrand(translations, production) {
    // -- Startup -- //
    production ? null : onbrandUtilityFunctionsTv2.devMode(devOptions);
    document.querySelector('body').insertAdjacentHTML('afterbegin', htmlHeader(translations));
    document.querySelector('body').insertAdjacentHTML('beforeend', htmlFooter(translations));
    window.onbrandLoaded = false;

    // makes the reco engine sticky to the target / top of screen
    onbrandUtilityFunctionsTv2.recoEnginePosition('.uf-top-nav-container');

    // -- Hub Events -- //
    window.addEventListener('uberflip.load', () => {
      if (!window.onbrandLoaded) {
        // block CTA fix is an optional request i.e if client need the CTA to be visible on scroll
        //onbrandUtilityFunctionsTv2.blockCTAFix();
        onbrandUtilityFunctionsTv2.fadeOutItem();
        onbrandUtilityFunctionsTv2.replaceHTMLElements();
        // Call all on load functions here
        window.onbrandLoaded = true;
      }
    }); //eslint-disable-line no-unused-vars
    window.addEventListener('uberflip.itemsLoaded', () => {
      // Call all itemsLoaded events here
      onbrandUtilityFunctionsTv2.replaceHTMLElements();
    }); //eslint-disable-line no-unused-vars
    window.addEventListener('uberflip.resize', () => {
      onbrandUtilityFunctionsTv2.sideCtaFix();
      onbrandUtilityFunctionsTv2.addThisFix();
      // Call all resize events here
    }); //eslint-disable-line no-unused-vars
    window.addEventListener('uberflip.scroll', () => {
      onbrandUtilityFunctionsTv2.sideCtaFix();
      onbrandUtilityFunctionsTv2.addThisFix();
      // block CTA fix is an optional request i.e if client need the CTA to be visible on scroll
      //onbrandUtilityFunctionsTv2.blockCTAFix();
      onbrandUtilityFunctionsTv2.fadeOutItem();
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
  },
};
