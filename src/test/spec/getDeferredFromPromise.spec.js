define([
   'jquery',
   'utils',
   'sinon',
   'getDeferredFromPromise'
],
function(
    $,
    utils,
    sinon,
    dfdUtils
) {
    'use strict';

    describe('getDeferredFromPromise.js', function() {
        var timerCallback;

        beforeEach(function() {
            timerCallback = jasmine.createSpy('timerCallback');
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('return a Deferred', function() {
            var fakePromise = $.Deferred().promise();
            var dfd = dfdUtils.getDeferredFromPromise(fakePromise);
            utils.checkIsADeferred(dfd);
        });

        it('a new deferred is resolved when the old deferred is resolved.', function() {
            var fakeDfd = $.Deferred();
            var fakePromise = fakeDfd.promise();
            var context = {};

            var wrapDfd = dfdUtils.getDeferredFromPromise(fakePromise);
            wrapDfd.done(timerCallback);

            var data = 'foo';
            fakeDfd.resolve(data);

            var expectContext = {
                object: fakePromise,
                args: [data],
                returnValue: undefined
            };

            utils.checkIsCalledWithContext(timerCallback, [expectContext]);
        });

    });

});
