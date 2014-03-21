/*
 * grunt-yui-packager
 * https://github.com/clicrdv/grunt-yui-packager
 *
 * Copyright (c) 2014 ClicRDV
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  /**
   * Options :
   *  - packageName  : String
   *  - dest         : String
   *  - modules      : [array of main modules]
   *  - loaders      : [array of loaders (relative) path]
   *  - langs        : [array]
   *  - splitLangs   : Boolean
   *  - saveJammit   : Boolean
   *  - setup        : Function
   */
  grunt.registerMultiTask('yui-packager', 'Package YUI projects', function() {

    var options = this.options({
      splitLangs: true,
      saveJammit: false
    });

    var deps = require('yui-deps');

    function setup (Y, config) {
       config.groups.inputex.base = '/javascripts/lib/inputex-3.2.0/build/';
       config.base = '/javascripts/lib/yui-3.9.1/';
       console.log('setup', config);
    }

    var packages = deps({
       YUI:         this.data.yui,
       langs:       this.data.langs,
       loaders:     this.data.loaders,
       require:     this.data.require,
       splitLangs:  this.data.splitLangs,
       packageName: this.data.packageName,
       setup:       this.data.setup
    });

    console.log(packages);

    if (this.data.saveJammit) {
      // TODO
    }

  });

};
