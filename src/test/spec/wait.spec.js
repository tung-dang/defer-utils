define([
   'jquery',
   'wait',
   'utils',
   'sinon'
],
function(
    $,
    dfdUtils,
    utils,
    sinon
) {
    'use strict';

    describe('wait.js', function() {
        var timerCallback;

        beforeEach(function() {
            timerCallback = jasmine.createSpy('timerCallback');
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('return a Promise', function() {
            var promise = dfdUtils.wait();
            utils.isPromise(promise);
        });

        it('done callback is called with timeout', function() {
            dfdUtils.wait(100).done(timerCallback);

            expect(timerCallback).not.toHaveBeenCalled();
            jasmine.clock().tick(101);
            expect(timerCallback).toHaveBeenCalled();
        });

        it('cancelWait to cancel callbacks', function() {
            var promise = dfdUtils.wait(100).done(timerCallback);

            expect(timerCallback).not.toHaveBeenCalled();
            promise.cancelWait();

            jasmine.clock().tick(101);
            expect(timerCallback).not.toHaveBeenCalled();
        });

        it('context of resolved callbacks', function() {
            var context = jasmine.createSpy('context');
            var promise = dfdUtils.wait(100, context).done(timerCallback);

            jasmine.clock().tick(101);
            utils.isCalledWithContext(timerCallback, [{
                object: context,
                args: [],
                returnValue: undefined
            }]);
        });

        it('context of rejected callbacks, context is reused from input parameter', function() {
            var context = jasmine.createSpy('context');
            var promise = dfdUtils.wait(100, context).fail(timerCallback);

            promise.cancelWait();

            jasmine.clock().tick(101);

            utils.isCalledWithContext(timerCallback, [{
                object: context,
                args: [],
                returnValue: undefined
            }]);
        });

        it('context of rejected callbacks, context is passed when cancelWait is called ', function() {
            var context1 = jasmine.createSpy('context1');
            var context2 = jasmine.createSpy('context2');
            var promise = dfdUtils.wait(100, context1).fail(timerCallback);

            promise.cancelWait(context2);

            jasmine.clock().tick(101);

            utils.isCalledWithContext(timerCallback, [{
                object: context2,
                args: [],
                returnValue: undefined
            }]);
        });

    });

});
