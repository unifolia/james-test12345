module.exports = {
  generateHeaderMenuLinks(arr) {
    return arr.map((link) => `<a href="${link.href}">${link.label}</a>`).join('');
  },

  returnPageType() {
    const classlist = [...document.querySelector('body').classList];
    return classlist.find((el) => el.includes('uf-')).substring(3);
  },

  /* --- Input parameters: 
  elemType               - String
  elemOptions (optional) - Object
  elemText (optional)    - String

  ie. 

  const button = createElem(
    'button', 
    {
      'type': 'button',
      'class': 'class-one class-two',
      'aria-haspopup': 'true',
      'aria-expanded': 'false',
    }, 
    'Click Me'
  );
  ------------------------------ */

  createElem(elemType, elemOptions, elemText) {
    const newElement = document.createElement(elemType);
    if (elemOptions !== undefined) {
      Object.keys(elemOptions).forEach((attr) => {
        newElement.setAttribute(attr, elemOptions[attr]);
      });
    }
    if (elemText !== undefined) {
      newElement.innerText = elemText;
    }
    return newElement;
  },
};
