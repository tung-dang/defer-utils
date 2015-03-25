(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'jquery'], function(exports, $) {
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
     * You want to deactivate an existing promise, so that it never calls the callbacks you
     * attatched to it earlier.
     * @param  {Promise} oldPromise - a give promise object.
     * @return {Deferred} new deferred object
     */
    var deactivatablePromise = function (oldPromise){
        var newDeferred = $.Deferred(),
            deactivated = false;

        /**
         * We use a deactivated variable that keeps track of whether deactivate has been called
         * and that we’ll use to conditionally trigger the new promise.
         *
         * @param {function} func - takes a function argument (func) and returns a function that will call func with an argument,
         * but only if deactivate has not been called.
         */
        var unlessDeactivated = function(func) {
            var newFunc = function(value) {
                if (!deactivated){
                    return func.apply(newDeferred, [].slice.call(arguments));
                }
                return newDeferred;
            };

            return newFunc;
        };

        var resolve = unlessDeactivated(newDeferred.resolve),
            resolveWith = unlessDeactivated(newDeferred.resolveWith),

            reject = unlessDeactivated(newDeferred.reject),
            rejectWith = unlessDeactivated(newDeferred.rejectWith),

            notify = unlessDeactivated(newDeferred.notify),
            notifyWith = unlessDeactivated(newDeferred.notifyWith);

        oldPromise
            .done(resolve)
            .fail(reject)
            .progress(notify);

        newDeferred.resolve = resolve;
        newDeferred.resolveWith = resolveWith;

        newDeferred.reject = reject;
        newDeferred.rejectWith = rejectWith;

        newDeferred.notify = notify;
        newDeferred.notifyWith = notifyWith;

        // For future-proof, we never want to override any property of a Deferred.
        if (newDeferred.deactivate) {
            console.warn('You are overriding a already `deactivate` property of a Deferred object.');
        }

        newDeferred.deactivate = function() {
            deactivated = true;
            return newDeferred;
        };

        return newDeferred;
    };

    // attach properties to the exports object to define
    // the exported module properties.
    exports.deactivatablePromise = deactivatablePromise;
}));

