var wait = require('wait');

// TODO:
//Ref: http://techbus.safaribooksonline.com/9781449369385/ch03_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE0NDkzNjkzODUlMkZfYXV0b21hdGljYWxseV9yZXRyeWluZ19mYWlsaW5nX2RlZmVycmVkX2NhbGxzX2h0bWwmcXVlcnk9
function retryingCaller(options) {
    var context = options.context;
    var func =  options.func;
    var args = options.args;
    var delays = options.delays || [0.0, 0.01, 0.02, 0.05, 0.1, 0.15, 0.2, 1.0, 2.0];

    var deferred = $.Deferred(),
    var promise = deferred.promise();

    var rejectValue,
        attempt = 0;

    /**
     * 'error' will be run each time a promise returned by the underlying function is rejected.
     * Its job is to save the first reject value and to either reject the master deferred (whose promise is returned by retryingCaller)
     * or to arrange for the underlying function to be called again.
     */
    var error = function (value) {
        if (rejectValue === undefined) {
            // Save the first reject value.
            rejectValue = value;
        }

        if (attempt === delays.length) {
            // If the number of allowed attempts has been reached, reject the master deferred with the original reject value.
            deferred.reject(rejectValue);
        } else {
            // We still have some attempts left, so call the underlying function again.
            call();
        }
    };

    var call = function () {
        // Wait for the next delay time to elapse before calling the underlying function.
        wait(delays[attempt++])
            .done(function() {
                $.when(func.apply(context, args))
                .then(
                    deferred.resolve, // If the underlying function runs without error, pass its return value along to the master deferred.
                    error // If the underlying function hits an error, call our error function, which will either arrange for a retry or reject the master deferred.
                );
            });
    };

    call();

    return promise;
};

module.export = retryingCaller;