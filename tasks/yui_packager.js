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

      var packages = deps({
         YUI:           this.data.yui,
         langs:         this.data.langs,
         loaders:       this.data.loaders,
         require:       this.data.require,
         use:           this.data.use,
         ignore:        this.data.ignore,
         splitLangs:    this.data.splitLangs,
         packageName:   this.data.packageName,
         setup:         this.data.setup
      });

      console.log(this.data.loaders);

    if (this.data.afterResolve) {
      this.data.afterResolve(packages);
    }

    if (this.data.saveJammit) {
      var yaml = require('js-yaml');
      var assets = yaml.safeLoad(grunt.file.read(this.data.saveJammit));

      Object.keys(packages['javascripts']).forEach(function (groupName) {
         assets['javascripts'][groupName] = packages['javascripts'][groupName];
      });

      Object.keys(packages['stylesheets']).forEach(function (groupName) {
         assets['stylesheets'][groupName] = packages['stylesheets'][groupName];
      });

      grunt.file.write(this.data.saveJammit, yaml.safeDump(assets));
    }

  });

};
