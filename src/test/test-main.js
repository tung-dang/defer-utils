/**
 * This configuration is for Karma test runner only.
 * configuration for test runner Karma is inside `src/test/spec/SpecRunner.html`.
 */

var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}


require.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/main',
    paths: {
        jquery: '../../lib/jquery-2.1.3',
    },
    shim: {
    },

     // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
