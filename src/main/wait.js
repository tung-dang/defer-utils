(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
           'exports',
           'jquery'
        ],
        function(
            exports,
            $
        ) {
            factory((root.dfdUtils = exports), $)
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('jquery'));
    } else {
        // Browser globals
        factory((root.dfdUtils = {}), root.jQuery);
    }
}(this, function (exports, $) {

    /**
     * [wait description]
     * @wait {integer} timeout number
     * @return {Promise}
     */
    var wait = function(timeout) {
        var deferred = $.Deferred();
        var promise = deferred.promise();

        var timeoutId = setTimeout(deferred.resolve, timeout);

        /**
        * @pram context {object} context to cancel
        */
        promise.cancelWait = function (context) {
            context = context || deferred;

            // convert arguments to array to exclude the first param, it is 'context'.
            var args = Array.prototype.slice.call(arguments, 1);

            clearTimeout(timeoutId);
            deferred.rejectWidth(context, args);
        };

        return promise;
    };

    // attach properties to the exports object to define
    // the exported module properties.
    exports.wait = wait;
}));



