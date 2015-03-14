var $ = require('jquery');

//ref: http://techbus.safaribooksonline.com/9781449369385/apa_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE0NDkzNjkzODUlMkZfZGVhY3RpdmF0aW5nX2FfcHJvbWlzZV9odG1sJnF1ZXJ5PQ==
function deactivatablePromise(promise){
    var deferred = $.Deferred(),
        newPromise = deferred.promise(),
        deactivated = false,
        // We use a deactivated variable that keeps track of whether deactivate has been called and that we’ll use to conditionally trigger the new promise.
        unlessDeactivated = function(func){
            // The unlessDeactivated function takes a function argument (func) and returns a function that will call func with an argument, but only if deactivate has not been called.
            return function(value){
                if (deactivated === false){
                    return func.apply(deferred, [].slice.call(arguments));
                }
            };
        };

    // Arrange for the existing promise to conditionally call the new deferred’s resolve, reject, and notify functions if it fires.
    // If the new promise has been deactivated (see next point), though, the event will not be passed on to the new promise.
    promise
        .done(unlessDeactivated(deferred.resolve))
        .fail(unlessDeactivated(deferred.reject))
        .progress(unlessDeactivated(deferred.notify));

    // We add a deactivate method to the new promise that just sets the deactivated variable to be true.
    newPromise.deactivate = function() { // 4
        deactivated = true;
        return newPromise;
    };

    return newPromise; // 5
}

function controllablePromise(promise){
    var deferred = $.Deferred(),
        deactivated = false,
        unlessDeactivated = function(func){
            return function(){
                if (deactivated === false){
                    return func.apply(deferred,
                                      [].slice.call(arguments));
                }
                return deferred;
            };
        },
        resolve = unlessDeactivated(deferred.resolve),
        resolveWith = unlessDeactivated(deferred.resolveWith),

        reject = unlessDeactivated(deferred.reject),
        rejectWith = unlessDeactivated(deferred.rejectWith),

        notify = unlessDeactivated(deferred.notify),
        notifyWith = unlessDeactivated(deferred.notifyWith);

    promise.done(resolve).fail(reject).progress(notify);

    deferred.resolve = resolve;
    deferred.resolveWith = resolveWith;

    deferred.reject = reject;
    deferred.rejectWith = rejectWith;

    deferred.notify = notify;
    deferred.notifyWith = notifyWith;

    deferred.deactivate = function(){
        deactivated = true;
        return deferred;
    };

    return deferred;
}


module.export = wait;
