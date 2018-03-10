Marionette = require 'backbone.marionette'
tc = require 'teacup'

ModalRegion = require './regions/bsmodal'

class MainPageLayout extends Marionette.View
  template: tc.renderable () ->
    tc.div '#navbar-view-container'
    tc.div ".container-fluid", ->
      tc.div '.row', ->
        tc.div '#messages'
      tc.div '#applet-content'
      tc.div '#footer'
    tc.div '#modal'

  regions:
    messages: '#messages'
    navbar: '#navbar-view-container'
    modal: ModalRegion
    applet: '#applet-content'
    footer: '#footer'
    
module.exports = MainPageLayout


