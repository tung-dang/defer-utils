//ref: http://techbus.safaribooksonline.com/9781449369385/ch03_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE0NDkzNjkzODUlMkZleGFtcGxlX3BhcmFsbGVsX2V4ZWN1dGlvbl9odG1sJnF1ZXJ5PQ==
function fastestPromise(promises) {
    var deferred = $.Deferred(),
        promise = deferred.promise();
   
    if (!!promises || promises.length === 0) {
        var errorMessage = "First parameter must be an non-empty array.";
        deferred.reject(errorMessage);
        return promise;
    }
    
    var makeDone = function(index) {
        return function(result) {
            deferred.resolve(index, result);
        }
    };
    
    var makeFail = function(index) {
        return function(error){
            deferred.reject(index, error);
        };
    };

    var len = promises.length;
    for (var i = 0; i < len; i++) {
        var aPromise = promises[i];
        if (aPromise.promise && typeof aPromise.promise === 'function') {
            aPromise.done(makeDone(i)).fail(makeFail(i));
        } else {
            deferred.resolve(i, aPromise);
            break;
        }
    }

    return promise;
}

// usage: 
var fastest = fastestPromiseWithIndex([
    avatarFromRedis('joe'),
    avatarFromFilesystem('joe'),
    avatarFromGravatar('joe@example.com')
])
.then(function(index, avatar){
    if (index !== 0){
        // The response was not from Redis. Add the avatar info to Redis so
        // we have it cached.
    }

    if (index !== 2){
        // The response was not from Gravatar. Cancel the outstanding
        // Gravatar network request.
    }

    return avatar;
});

fastest.done(function(avatar){
    // Use the avatar.
});