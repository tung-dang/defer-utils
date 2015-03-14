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
     * A replacement for 'setTimeout' function and return a Promise
     *
     * @example:
     * var promise = wait(100);
     * promise.done(function () {
     *     console.log('After 100 ms.');
     * });
     *
     * @example:
     * var promise = wait(100);
     * promise.cancelWait();
     *
     * promise.done(function () {
     *     console.log('This never happens.');
     * });
     *
     * promise.reject(function () {
     *     console.log('Your train is cancel.');
     * });
     *
     * @param {integer} wait - timeout number
     * @param {object} context - a context of execution of all callbacks when deferred object is resolved or rejected
     * @return {Promise}
     */
    var wait = function(timeout, context) {
        var deferred = $.Deferred();
        var promise = deferred.promise();

        var timeoutId = setTimeout(function() {
            deferred.resolveWith(context, arguments)
        }, timeout || 0);

        /**
        * @param {object} context - context of cancelWait
        */
        promise.cancelWait = function (contextOfCancel) {

            // convert arguments to array to exclude the first param, it is 'context'.
            var args = Array.prototype.slice.call(arguments, 1);

            clearTimeout(timeoutId);
            deferred.rejectWith(contextOfCancel || context, args);
        };

        return promise;
    };

    // attach properties to the exports object to define
    // the exported module properties.
    exports.wait = wait;
}));



