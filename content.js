if (window.location.hostname === 'support.pse.ngo') {
  const phoneRegex = /\b0\d{7,13}\b/g;

  function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
      return phoneNumber.replace(/^0/, '');
    }
    return null;
  }

  function convertPhoneNumbers(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    textNodes.forEach((textNode) => {
      const matches = textNode.textContent.match(phoneRegex);
      if (matches) {
        let updatedContent = textNode.textContent;

        matches.forEach((phoneNumber) => {
          const formattedNumber = formatPhoneNumber(phoneNumber);
          if (formattedNumber) {
            const linkHTML = `<a href="https://t.me/+855${formattedNumber}" style="color: blue;" target="_blank">${phoneNumber}</a>`;
            updatedContent = updatedContent.replace(phoneNumber, linkHTML);
          }
        });

        const newNode = document.createElement('span');
        newNode.innerHTML = updatedContent;
        textNode.parentNode.replaceChild(newNode, textNode);
      }
    });
  }

  function showWelcomePopup() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '10000';
    popup.innerHTML = `
      <h1>Welcome to PSE Gaming CLUB !!</h1>
      <p>The extension is now active on this page.</p>
      <p>Develope by xcozy999.</p>
      <button id="closePopup">Close</button>
    `;
    document.body.appendChild(popup);

    document.getElementById('closePopup').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  }

  window.addEventListener('load', () => {
    convertPhoneNumbers(document.body);
    showWelcomePopup();
  });

  setInterval(() => {
    convertPhoneNumbers(document.body);
  }, 3000); // 3 seconds
}

// develop by god decentdent of god of pse