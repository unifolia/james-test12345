// ENGLISH ENTRY POINT
// Entry points need to exists inside of webpack.config.js under module.exports, entry:
// Entry points is meant for the translations object.
// english.js is meant for custom functions for the english hub.
// _en.scss is meant for custom stylings for the english hub.

require('../partials/hub-specific-styles/_en.scss');
const hubSpecificJS = require('../script-partials/hub-specific-functions/english.js');
const onbrandScripts = require('../onbrand.js');

//only use if there are descrepencies between different language sites.
const generateLinks = (arr) => {
  return arr.map((link) => `<a href="${link.href}" id="${link.id}">${link.label}</a>`).join('');
};

const translations = {
  header: {},
  footer: {},
};

hubSpecificJS();
onbrandScripts.initOnbrand(translations, production);
