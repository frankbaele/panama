requirejs.config({
    paths: {
        text: '../bower_components/text/text',
        Keypress: '../bower_components/Keypress/keypress-2.1.0.min',
        jquery: '../bower_components/jquery/dist/jquery',
        lodash: '../bower_components/lodash/lodash',
        q: '../bower_components/q/q',
        'lodash-amd': '../../bower_components/lodash-amd/compat/main'
    },
    shim: {
        jQuery: {
            exports: 'jQuery'
        },
        lodash: {
            exports: '_'
        }
    },
    packages: [

    ]
});
requirejs(['./scripts/app']);