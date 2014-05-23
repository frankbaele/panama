requirejs.config({
  paths: {
    jQuery: './scripts/vendor/jquery-2.0.3.min',
    underscore: './scripts/vendor/lodash.min',
    text: './scripts/vendor/require.text',
    keypress: './scripts/vendor/keypress',
    angular: './scripts/vendor/angular.min',
    'angular-ui-router': './scripts/vendor/angular-ui-router.min'
  },
  shim: {
    'angular' : {
      'exports' : 'angular'
    },
    'angular-ui-router': {
      deps:['angular']
    },
    'jQuery': {
      'exports' : 'jQuery'
    },
    'underscore': {
      exports: '_'
    }
  },
  deps:['angular']
});
requirejs( ['./scripts/app']);