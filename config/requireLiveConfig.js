requirejs.config({
    paths: {
        text: 'scripts/vendor/text',
        Keypress: 'scripts/vendor/keypress-2.1.0.min',
        jQuery: 'scripts/vendor/jquery',
        lodash: 'scripts/vendor/lodash',
        q: 'scripts/vendor/q',
        pathfinding: 'scripts/vendor/pathfinding-browser',
        RVO: 'scripts/vendor/rvo2.min'
    },
    shim:{
        RVO:{
            exports: 'RVO'
        }
    },
    packages: [

    ]
});