const aboutA = require('./about-a');
const shareA = require('../share/share-a');

const p = document.createElement('p');
const textNode = document.createTextNode('This is about page');
p.appendChild(textNode);
document.body.appendChild(p);

aboutA.appendLink();
console.log('about', shareA);
