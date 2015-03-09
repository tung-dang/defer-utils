// Uses CommonJS, AMD or browser globals to create a module.

// If you just want to support Node, or other CommonJS-like environments that
// support module.exports, and you are not creating a module that has a
// circular dependency, then see returnExports.js instead. It will allow
// you to export a function as the module value.

// Defines a module "commonJsStrict" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(/*'defer.utils.wait', */['exports', 'jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('jquery'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.jQuery);
    }
}(this, function (exports, $) {
    // var $ = require('jquery');

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
    exports.action = wait;
}));



