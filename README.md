# Defer-utils
Collection of helper methods regarding to Deferred and Promises.
Inpired from ['Learning jQuery Deferred'](http://techbus.safaribooksonline.com/book/web-development/jquery/9781449369385) book.

## Structure of folder
```
├── doc
├── lib
│   ├── jasmine-2.2.0
│   ├── requirejs
│   └── sinon
└── src
    ├── main
    └── test
        └── spec

```
* JS main source is in `src/main/`
* Third-parties are in `lib`
* Test source (aka spec files) are in `src/test/spec`. There are 2 ways to run tests:
    * open this file `src/test/spec/SpecRunner.html`, or
    * running `karma start` command.
* If you want add more test files, you need to modify `src/test/jasmine-boot.js`, example:

```
 $(document).ready(function () {
    var specs = [];

    // add spec files here.
    specs.push('spec/wait.spec');
    specs.push('spec/getDeferredFromPromise.spec');

    require(specs, function () {
        htmlReporter.initialize();
        env.execute();
    });
});
```

* `src/test/test-main.js` is a RequireJS configuration for Karma test runner. Configuration for browser test runner is inside `src/test/spec/SpecRunner.html`


## Libaries:
* jQuery: almose codes are based on jQuery Deferred.
* Jasmine: testing framework
* Karma: test runner
* JS module pattern: [UMD](https://github.com/umdjs/umd)
* RequireJS: a main loader for JS modules in browsers and test runner
* Gulp: a build tool.

## Contributing
All contributions are welcome!. If you need any helps, please submit a issue/question [here](/tung-dang/defer-utils/issues).

## Copyright and license
Copyright (c) 2015 Assemble
Released under the [MIT License](LICENSE-MIT).
