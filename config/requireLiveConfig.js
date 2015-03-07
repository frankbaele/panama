requirejs.config({
    paths: {
        text: 'scripts/vendor/text',
        Keypress: 'scripts/vendor/keypress-2.1.0.min',
        jquery: 'scripts/vendor/dist/jquery',
        lodash: 'scripts/vendor/lodash',
        q: 'scripts/vendor/q'
    },
    packages: [

    ]
});
requirejs(['./scripts/app']);