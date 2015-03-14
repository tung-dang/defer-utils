define(function() {
    var exports = {};
    exports.wait = function(timeout) {
        return $.Deferred().resolve().promise();
    };
    return exports;
});
