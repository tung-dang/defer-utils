define([
   'jquery',
],
function(
    $
) {
    var utils = {};

    utils.checkIsAPromise = function(obj) {
        expect(typeof obj.resolve).toEqual('undefined');
        expect(typeof obj.reject).toEqual('undefined');
        expect(typeof obj.notify).toEqual('undefined');
    };

    utils.checkIsADeferred = function(obj) {
        expect(typeof obj.resolve).toEqual('function');
        expect(typeof obj.reject).toEqual('function');
        expect(typeof obj.notify).toEqual('function');
    };

    utils.checkIsCalledWithContext = function(func, context) {
        expect(func).toHaveBeenCalled();
        expect(func.calls.all()).toEqual(context);
    };

    return utils;
});
