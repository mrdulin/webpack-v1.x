const homeA = require('./home-a');
const shareA = require('../share/share-a');

const p = document.createElement('p');
const textNode = document.createTextNode('This is home page');
p.appendChild(textNode);
document.body.appendChild(p);

homeA.appendHomeButton();
console.log('home', shareA)
