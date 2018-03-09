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
    
class NavbarEntryCollection extends Backbone.Collection
  model: NavbarEntry

navbar_entry_collection = new NavbarEntryCollection
MainChannel.reply 'navbar-entries', ->
  navbar_entry_collection

MainChannel.reply 'new-navbar-entry', ->
  new NavbarEntry

MainChannel.reply 'add-navbar-entry', (atts) ->
  navbar_entry_collection.add atts
  
MainChannel.reply 'add-navbar-entries', (olist) ->
  navbar_entry_collection.add olist

##################################################
# we may remove the channel stuff later, or use it
##################################################

  
navbar_collapse_button  = tc.renderable (target) ->
  tc.button '.navbar-toggle', type:'button', 'data-toggle':'collapse',
  'data-target': "##{target}", ->
    tc.span '.sr-only', 'Toggle Navigation'
    tc.span '.icon-bar'
    tc.span '.icon-bar'
    tc.span '.icon-bar'
      

"""
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
"""

class NavbarToggleButton extends Marionette.View
  tagName: 'button'
  className: 'navbar-toggler'
  attributes:
    type: 'button'
    'data-toggle': 'collapse'
    'data-target': '#navbar-view-collapse'
    'aria-controls': 'navbar-view-collapse'
    'aria-expanded': 'false'
    'aria-label': 'Toggle navigation'
  template: tc.renderable ->
    tc.span '.navbar-toggler-icon'
    
    
class NavbarHeaderView extends Marionette.View
  template: tc.renderable (model) ->
    tc.a '.navbar-brand', href:model.url, model.label
    tc.span '.toggle-button'
  regions:
    toggle: '.toggle-button'
  ui:
    brand: '.navbar-brand'
  triggers:
    'click @ui.brand': 'click:brand'
  onRender: ->
    tview = new NavbarToggleButton
    @showChildView 'toggle', tview
    
    
module.exports = NavbarHeaderView



