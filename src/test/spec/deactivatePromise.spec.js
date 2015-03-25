define([
   'jquery',
   'utils',
   'sinon',
   'deactivatePromise'
],
function(
    $,
    utils,
    sinon,
    dfdUtils
) {
    'use strict';

    describe('deactivatePromise.js', function() {
        var timerCallback;

        beforeEach(function() {
            timerCallback = jasmine.createSpy('timerCallback');
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('return a new Deferred, which has "deactivate" method', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd = dfdUtils.deactivatablePromise(oldPromise);
            utils.checkIsADeferred(newDfd);

            expect(newDfd).not.toEqual(oldDfd);
            expect(typeof newDfd.deactivate).toEqual('function');
        });

        it('"deactivate" method should return a new deferred', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd1 = dfdUtils.deactivatablePromise(oldPromise);
            var newDfd2 = newDfd1.deactivate();

            utils.checkIsADeferred(newDfd2);

            expect(newDfd1).toEqual(newDfd2);
        });

        it('old deferred resolves, new deferred resolves as well', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd = dfdUtils.deactivatablePromise(oldPromise);
            oldDfd.resolve();

            expect(newDfd.state()).toEqual('resolved');
        });

        it('old deferred rejects, new deferred rejects as well', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd = dfdUtils.deactivatablePromise(oldPromise);
            oldDfd.reject();

            expect(newDfd.state()).toEqual('rejected');
        });

        it('old deferred resolves, new deferred resolves as well with correct context and arguments', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd = dfdUtils.deactivatablePromise(oldPromise);
            newDfd.done(timerCallback);
            oldDfd.resolve(1, 2, 3);

            expect(newDfd.state()).toEqual('resolved');

            utils.checkIsCalledWithContext(timerCallback, [{
                object: newDfd.promise(),
                args: [1, 2, 3],
                returnValue: undefined
            }]);
        });

        it('"deactivate" method of new deferred is called, it should stop resolving of old deferred', function() {
            var oldDfd = $.Deferred();
            var oldPromise = oldDfd.promise();

            var newDfd = dfdUtils.deactivatablePromise(oldPromise);
            newDfd.promise().done(timerCallback);

            newDfd.deactivate();

            // although oldDfd is resolved, but the success callback is not called due to deactivating before.
            oldDfd.resolve(1, 2, 3);

            expect(oldDfd.state()).toEqual('resolved');
            expect(newDfd.state()).toEqual('pending');

            expect(timerCallback).not.toHaveBeenCalled();
        });

    });

});
