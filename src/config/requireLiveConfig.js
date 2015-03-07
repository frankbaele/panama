requirejs.config({
    paths: {
        text: './vendor/text',
        Keypress: './vendor/keypress-2.1.0.min',
        jquery: './vendor/dist/jquery',
        lodash: './vendor/lodash',
        q: './vendor/q'
    },
    packages: [

    ]
});
requirejs(['./scripts/app']);