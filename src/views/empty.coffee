Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

class EmptyView extends Backbone.Marionette.View
  template: tc.renderable ->
    tc.div '.jumbotron', ->
      tc.h1 ->
        tc.text 'Loading ...'
        tc.i '.fa.fa-spinner.fa-spin'
    
  
module.exports = EmptyView
