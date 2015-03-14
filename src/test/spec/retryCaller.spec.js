define([
   'jquery',
   'utils',
   'sinon',
   'retryCaller'
],
function(
    $,
    utils,
    sinon,
    dfdUtils
) {
    'use strict';

    describe('retryCaller.js', function() {
        var masterFunc;

        beforeEach(function() {
            masterFunc = jasmine.createSpy('masterFunc');
            jasmine.clock().install();

            this.countAttempts = 0;
            this.context = {id: Date.now()};
        });

        afterEach(function() {
            jasmine.clock().uninstall();

            this.countAttempts = 0;
            this.context = null;
        });

        it('expect returning a Promise', function() {
            var promise = dfdUtils.retryCaller(masterFunc);
            utils.checkIsAPromise(promise);
        });

        it('a master function is called out of maximum times, and fail callback is called.', function() {
            this.countAttempts = 0;

            masterFunc.and.callFake(function() {
                ++this.countAttempts;

                var deferred = $.Deferred()
                deferred.reject(this.countAttempts);
                return deferred.promise();
            }.bind(this));

            var cbFail = jasmine.createSpy('cbFail');

            var promise = dfdUtils.retryCaller(masterFunc).fail(cbFail);

            expect(masterFunc.calls.count()).toEqual(5);
        });

        it('check context of fail callback', function() {
            masterFunc.and.callFake(function() {
                ++this.countAttempts;

                var deferred = $.Deferred()
                deferred.reject(this.countAttempts);
                return deferred.promise();
            }.bind(this));

            var cbFail = jasmine.createSpy('cbFail');

            var promise = dfdUtils.retryCaller(masterFunc, {
                context: this.context
            }).fail(cbFail);

            utils.checkIsCalledWithContext(cbFail, [{
                object: this.context,
                args: [ [1, 2, 3, 4, 5] ],
                returnValue: undefined
            }]);
        });

        it('a master function is called 3 times, and done callback is called.', function() {
            masterFunc.and.callFake(function() {
                ++this.countAttempts;

                var deferred = $.Deferred()
                if (this.countAttempts <= 3) {
                    deferred.reject(this.countAttempts);
                } else {
                    deferred.resolve(this.countAttempts);
                }
                return deferred.promise();
            }.bind(this));

            var cbDone = jasmine.createSpy('cbDone');

            var promise = dfdUtils.retryCaller(masterFunc, {
                context: this.context
            }).done(cbDone);;

            expect(masterFunc.calls.count()).toEqual(4);
            expect(this.countAttempts).toEqual(4);

            utils.checkIsCalledWithContext(cbDone, [{
                object: this.context,
                args: [ 4 ],
                returnValue: undefined
            }]);
        });

        it('check with tester function', function() {
            masterFunc.and.callFake(function() {
                ++this.countAttempts;

                var deferred = $.Deferred()
                deferred.reject(this.countAttempts);
                return deferred.promise();
            }.bind(this));

            var cbDone = jasmine.createSpy('cbDone');
            var cbTester = jasmine.createSpy('cbTester');
            cbTester.and.callFake(function (value) {
                if (value === 3) {
                    return false; // current reject is not error, resolve it.
                } else {
                    return true; // current reject is error, continue to attempt.
                }
            });

            var promise = dfdUtils.retryCaller(masterFunc, {
                context: this.context,
                tester: cbTester
            }).done(cbDone);;

            expect(masterFunc.calls.count()).toEqual(3);
            expect(cbTester.calls.count()).toEqual(3);
            expect(this.countAttempts).toEqual(3);

            utils.checkIsCalledWithContext(cbDone, [{
                object: this.context,
                args: [ 3 ],
                returnValue: undefined
            }]);
        });

    });

});
