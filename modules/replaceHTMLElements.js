const replaceHTMLElements = (elementContainer, element, newElementTag, elementClass = "") => {
  // Target specific elements based on function params
  // This will select all elements that are the children of specific elements
    const targetElement = [...document.querySelectorAll(`${elementContainer} ${element}`)];
  
    // Ensure targeted elements actually exist, and execute function if so!
    if (targetElement) {
      targetElement.forEach((element) => {
        // Create new element based on newElementTag argument
        const newElement = document.createElement(newElementTag);

        // Copy over inner HTML / element content
        newElement.innerHTML = element.innerHTML;
      
        // Copy over classlist & ID
        element.classList ? newElement.classList = element.classList : null;
        element.id ? newElement.id = element.id : null;

        // Add new class (if applicable)
        elementClass ? newElement.classList.add(elementClass) : null;

        // Replace!
        element.replaceWith(newElement);
      });
    }
};

module.exports = replaceHTMLElements;