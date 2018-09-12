var nova = (function() {
    function hello(name) {
        document.write('hello, ', name);
    }
    
    return {
        hello: hello
    }
})();


var helpers = {
    getBody: function getBody() {
        return document.body;
    },

    getUserAgent: function getUserAgent() {
        return navigator.userAgent;
    }
};

