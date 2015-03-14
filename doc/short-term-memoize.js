// Ref: http://techbus.safaribooksonline.com/9781449369385/apa_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE0NDkzNjkzODUlMkZfc2hvcnRfdGVybV9tZW1vaXphdGlvbl9vZl9pbl9wcm9ncmVzc19mdW5jdGlvbl9jYWxsc19odG1sJnF1ZXJ5PQ==

var promises = {};
function createUser(username) {
    if (promises.hasOwnProperty(username)){
        return promises[username];
    } else {
        var promise = internalCreateUser(username);
        promises[username] = promise;
        promise.always(function() {
            delete promises[username];
        });
        return promise;
    }
}

module.export = createUser;
