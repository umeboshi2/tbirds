$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

NavbarEntry = require './entry-model'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

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

module.exports = {}


