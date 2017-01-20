'use strict';

var falafel = require('falafel');
var transformLoopWithLimit = require('./transformLoopWithLimit.js');

module.exports = function (source) {
  this.cacheable(false);

  var options = this.loaders[this.loaderIndex].options;
  var limit = options && options.limit || 1e9;
  var fn = transformLoopWithLimit(limit);
  var opts = options && options.opts || {
    allowImportExportEverywhere: true
  };

  var output = falafel(source, opts, fn);
  return output.toString();
};
