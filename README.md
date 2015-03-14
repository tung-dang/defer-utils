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
* JS source code files are in `src/main/`
* Third-parties libaries are in `lib`
* Test files (aka spec files) are in `src/test/spec`. There are 2 ways to run tests:
    * open this file `src/test/spec/SpecRunner.html`, or
    * running `karma start` command.
* If you want add more test files, you need to modify `src/test/jasmine-boot.js`, example:

```
 $(document).ready(function () {
    // add spec files here.
    var specs = [];
    specs.push('spec/wait.spec');
    specs.push('spec/getDeferredFromPromise.spec');

    require(specs, function () {
        htmlReporter.initialize();
        env.execute();
    });
});
```

* `src/test/test-main.js` is a RequireJS configuration for Karma only. Configuration for browser mode is inside `src/test/spec/SpecRunner.html`


## Libaries:
* jQuery: base on jQuery Deferred.
* Jasmine: testing framework
* Karma: test runner
* JS module pattern: [UMD](https://github.com/umdjs/umd)
* RequireJS: a main loader for JS modules in browsers and test runner

## Contributing
All contributions are welcome!. If you need any helps, please submit a issue/question [here](/tung-dang/defer-utils/issues).

## Copyright and license
Copyright (c) 2015 Assemble
Released under the [MIT License](LICENSE-MIT).
