var $ = require('jquery');

function getDeferredFromPromise(promise){
     var deferred = $.Deferred();

    promise
        .done(deferred.resolve)
        .fail(deferred.reject)
        .progress(deferred.notify);

    return deferred;
}

module.export = getDeferredFromPromise;
