define([
   'jquery',
   'wait'],
function(
    $,
    dfdUtils
) {
    describe('just checking', function() {

        it('works for app', function() {
            console.log(dfdUtils);
            console.log(dfdUtils.wait);
            expect("").toEqual('');
        });

    });

});
