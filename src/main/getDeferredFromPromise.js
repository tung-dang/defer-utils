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
     * Get a Deferred from a Promise object.
     *
     * @example: You might be building a system that needs to time out the requests it is making,
     * causing them to immediately resolve with a specific defaul value.
     * Or you might want an outstanding deferred to be rejected at a specific moment (ex: system shutdown)
     * with a specific value.
     *
     * @param  {object} promise - a Promise object.
     * @return {object} return a new Deferred object.
     */
    var getDeferredFromPromise = function (promise){
        var deferred = $.Deferred();

        promise
            .done(deferred.resolve)
            .fail(deferred.reject)
            .progress(deferred.notify);

        return deferred;
    };

    exports.getDeferredFromPromise = getDeferredFromPromise;
}));




