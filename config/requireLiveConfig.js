requirejs.config({
  paths: {
    jQuery: './scripts/vendor/jquery-2.0.3.min',
    underscore: './scripts/vendor/lodash.min',
    text: './scripts/vendor/require.text',
    keypress: './scripts/vendor/keypress'
  },
  shim: {
    'jQuery': {
      'exports' : 'jQuery'
    },
    'underscore': {
      exports: '_'
    }
  }
});
requirejs( ['./scripts/app']);