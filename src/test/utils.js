define([
   'jquery',
],
function(
    $
) {
    var utils = {};

    utils.isPromise = function(obj) {
        expect(typeof obj.resolve).toEqual('undefined');
        expect(typeof obj.reject).toEqual('undefined');
        expect(typeof obj.notify).toEqual('undefined');
    };

    utils.isCalledWithContext = function(func, context) {
        expect(func).toHaveBeenCalled();
        expect(func.calls.all()).toEqual(context);
    };

    return utils;
});
