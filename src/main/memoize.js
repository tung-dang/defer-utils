// Ref: http://techbus.safaribooksonline.com/9781449369385/example_set_timeout_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE0NDkzNjkzODUlMkZleGFtcGxlX21lbW9pemF0aW9uX2h0bWwmcXVlcnk9
function memoize(func) {
    // The promises object holds promises corresponding to calls already made to func.
    var promises = {};

    return function(arg) {
        var key = JSON.stringify(arg);

        // When a call is made, check for an existing promise for the given argument.
        if (promises.hasOwnProperty(key) === false) {
            // If the promise doesn’t exist, this is the first time we’ve been called with this argument.
            // Call func on the argument, use $.when to create a promise that will be resolved with the result, and store the new promise.
            promises[key] = $.when(func.apply(context, arg)).promise();
        }

        // Return the promise for this call.
        return promises[key];
    };
}

module.export = memoize;
