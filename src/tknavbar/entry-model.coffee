$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class NavbarEntry extends Backbone.Model
  defaults:
    label: 'App Label'
    url: '#app'
    single_applet: false
    applets: []
    urls: []
    
module.exports = NavbarEntry



