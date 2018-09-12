module.exports = function () {
    var domImg = document.createElement('img');
    domImg.onload = function() {
        document.getElementById('container').appendChild(domImg);
    };
    domImg.src = require('../images/1.jpg');
};



