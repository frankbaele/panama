define([''], function () {
  var list = [];
  function add(command) {
    list.push(command)
  };

  function clear() {
    list = [];
  };

  function get(){
    return list;
  };

  return {
    add: add,
    get: get,
    clear : clear
  };

});